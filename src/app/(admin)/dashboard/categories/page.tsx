"use client";

import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/categories";
import type { Category } from "@/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Category | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function load() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <span className="line-clamp-1 max-w-xs text-muted-foreground">
          {row.original.description}
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

  async function handleSave(formData: FormData) {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;

    try {
      if (editing) {
        const updated = await updateCategory(editing._id, { name, slug, description });
        setCategories((prev) =>
          prev.map((c) => (c._id === editing._id ? updated : c)),
        );
      } else {
        const created = await createCategory({ name, slug, description });
        setCategories((prev) => [...prev, created]);
      }
      setDialogOpen(false);
      setEditing(null);
    } catch (err) {
      console.error("Failed to save category:", err);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      await deleteCategory(deleteId);
      setCategories((prev) => prev.filter((c) => c._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-2 text-foreground">Categories</h1>
          <p className="text-sm text-muted-foreground">
            Organize your product categories
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setEditing(null); }}>
          <DialogTrigger render={<Button><IconPlus className="h-4 w-4" /> Add Category</Button>} />
          <DialogContent className="sm:max-w-md">
            <form action={handleSave}>
              <DialogHeader>
                <DialogTitle>{editing ? "Edit Category" : "Add Category"}</DialogTitle>
                <DialogDescription>
                  {editing ? "Update the category details below." : "Create a new product category."}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                  <Input id="name" name="name" defaultValue={editing?.name ?? ""} placeholder="e.g. Laptops" required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="slug" className="text-sm font-medium text-foreground">Slug</label>
                  <Input id="slug" name="slug" defaultValue={editing?.slug ?? ""} placeholder="e.g. laptops" required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="description" className="text-sm font-medium text-foreground">Description</label>
                  <Input id="description" name="description" defaultValue={editing?.description ?? ""} placeholder="Brief description" />
                </div>
              </div>
              <DialogFooter showCloseButton>
                <Button type="submit">{editing ? "Save Changes" : "Create Category"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">Loading...</div>
      ) : (
        <DataTable columns={columns} data={categories} searchKey="name" searchPlaceholder="Search categories..." />
      )}

      <Dialog open={!!deleteId} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? Products assigned to it may become uncategorized.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
