"use client";

import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MOCK_PRODUCTS } from "@/constants/products";
import { MOCK_CATEGORIES } from "@/constants/categories";
import type { Product } from "@/types";

let nextId = 200;
function generateId() {
  return `prod-${nextId++}`;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [editing, setEditing] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formCategoryId, setFormCategoryId] = useState("");
  const [formStatus, setFormStatus] = useState<"draft" | "published">("draft");
  const [formFeatured, setFormFeatured] = useState(false);

  const categoryMap = Object.fromEntries(
    MOCK_CATEGORIES.map((c) => [c._id, c.name]),
  );

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{row.original.name}</span>
          <span className="text-xs text-muted-foreground">{row.original.brand}</span>
        </div>
      ),
    },
    {
      accessorKey: "categoryId",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline" className="font-normal">
          {categoryMap[row.original.categoryId] ?? "Uncategorized"}
        </Badge>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <span className="font-mono text-sm">
          ${row.original.price.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => (
        <span
          className={row.original.stock < 10 ? "text-destructive" : "text-foreground"}
        >
          {row.original.stock}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={row.original.status === "published" ? "default" : "secondary"}
          className="font-normal"
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "featured",
      header: "Featured",
      cell: ({ row }) => (
        <span className={row.original.featured ? "text-accent-blue" : "text-muted-foreground"}>
          {row.original.featured ? "Yes" : "No"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => {
              setEditing(row.original);
              setFormCategoryId(row.original.categoryId);
              setFormStatus(row.original.status);
              setFormFeatured(row.original.featured);
              setDialogOpen(true);
            }}
          >
            <IconEdit className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setDeleteId(row.original._id)}
            className="text-destructive hover:text-destructive"
          >
            <IconTrash className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  function handleSave(formData: FormData) {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const brand = formData.get("brand") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));

    if (editing) {
      setProducts((prev) =>
        prev.map((p) =>
          p._id === editing._id
            ? {
                ...p,
                name,
                slug,
                description,
                brand,
                price,
                stock,
                categoryId: formCategoryId || editing.categoryId,
                status: formStatus,
                featured: formFeatured,
              }
            : p,
        ),
      );
    } else {
      setProducts((prev) => [
        ...prev,
        {
          _id: generateId(),
          name,
          slug,
          description,
          brand,
          price,
          stock,
          categoryId: formCategoryId,
          status: formStatus,
          featured: formFeatured,
          compareAtPrice: undefined,
          images: [],
          specifications: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }

    setDialogOpen(false);
    setEditing(null);
  }

  function handleDelete() {
    if (!deleteId) return;
    setProducts((prev) => prev.filter((p) => p._id !== deleteId));
    setDeleteId(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-2 text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground">
            Manage your product catalog
          </p>
        </div>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setEditing(null);
          }}
        >
          <DialogTrigger
            render={<Button><IconPlus className="h-4 w-4" /> Add Product</Button>}
          />
          <DialogContent className="sm:max-w-lg">
            <form action={handleSave}>
              <DialogHeader>
                <DialogTitle>{editing ? "Edit Product" : "Add Product"}</DialogTitle>
                <DialogDescription>
                  {editing
                    ? "Update the product details below."
                    : "Create a new product."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editing?.name ?? ""}
                    required
                  />
                </div>
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label
                    htmlFor="slug"
                    className="text-sm font-medium text-foreground"
                  >
                    Slug
                  </label>
                  <Input
                    id="slug"
                    name="slug"
                    defaultValue={editing?.slug ?? ""}
                    required
                  />
                </div>
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium text-foreground"
                  >
                    Description
                  </label>
                  <Input
                    id="description"
                    name="description"
                    defaultValue={editing?.description ?? ""}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="brand"
                    className="text-sm font-medium text-foreground"
                  >
                    Brand
                  </label>
                  <Input
                    id="brand"
                    name="brand"
                    defaultValue={editing?.brand ?? ""}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Category
                  </label>
                  <Select
                    value={formCategoryId}
                    onValueChange={(v) => setFormCategoryId(v ?? "")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_CATEGORIES.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="price"
                    className="text-sm font-medium text-foreground"
                  >
                    Price ($)
                  </label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={editing?.price ?? ""}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="stock"
                    className="text-sm font-medium text-foreground"
                  >
                    Stock
                  </label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    defaultValue={editing?.stock ?? ""}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Status
                  </label>
                  <Select
                    value={formStatus}
                    onValueChange={(v) => setFormStatus((v ?? "draft") as "draft" | "published")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <input
                      type="checkbox"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="h-4 w-4 rounded border-card-border bg-card accent-accent-blue"
                    />
                    Featured
                  </label>
                </div>
              </div>
              <DialogFooter showCloseButton>
                <Button type="submit">
                  {editing ? "Save Changes" : "Create Product"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={columns}
        data={products}
        searchKey="name"
        searchPlaceholder="Search products..."
      />

      <Dialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
