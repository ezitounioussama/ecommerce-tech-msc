"use client";

import { useEffect, useState, useCallback } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { IconEye, IconShoppingCart } from "@tabler/icons-react";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { getOrders, updateOrderStatus } from "@/services/orders";
import type { Order, OrderStatus } from "@/types";

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  confirmed: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
  shipped: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  delivered: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState<Order | null>(null);

  async function load() {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const handleStatusChange = useCallback(
    async (orderId: string, newStatus: OrderStatus) => {
      const prev = orders;
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)),
      );
      try {
        await updateOrderStatus(orderId, newStatus);
      } catch {
        setOrders(prev);
      }
    },
    [orders],
  );

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "_id",
      header: "Order ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-muted-foreground">
          {row.original._id.slice(0, 8)}...
        </span>
      ),
    },
    {
      accessorKey: "customerName",
      header: "Customer",
      cell: ({ row }) => (
        <div>
          <p className="text-sm font-medium text-foreground">
            {row.original.customerName}
          </p>
          <p className="text-xs text-muted-foreground">
            {row.original.customerEmail}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "items",
      header: "Items",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.items.reduce((s, i) => s + i.quantity, 0)} items
        </span>
      ),
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => (
        <span className="font-medium text-foreground tabular-nums">
          ${row.original.total.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Select
            value={status}
            onValueChange={(val) => handleStatusChange(row.original._id, val as OrderStatus)}
          >
            <SelectTrigger
              size="sm"
              className={`h-7 w-[120px] rounded-full border px-2.5 text-xs font-medium ${statusColors[status]}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="center">
              {(
                ["pending", "confirmed", "shipped", "delivered", "cancelled"] as OrderStatus[]
              ).map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground tabular-nums">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setViewing(row.original)}
          >
            <IconEye className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="heading-2 text-foreground">Orders</h1>
        <p className="text-sm text-muted-foreground">
          View and manage customer orders
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          Loading...
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={orders}
          searchKey="customerName"
          searchPlaceholder="Search by customer name..."
        />
      )}

      <Dialog open={!!viewing} onOpenChange={(open) => { if (!open) setViewing(null); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {viewing && `Order ${viewing._id.slice(0, 8)}...`}
            </DialogDescription>
          </DialogHeader>
          {viewing && (
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge
                  variant="outline"
                  className={`${statusColors[viewing.status]} rounded-full`}
                >
                  {viewing.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Customer</span>
                <span className="text-foreground">{viewing.customerName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="text-foreground">{viewing.customerEmail}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Phone</span>
                <span className="text-foreground">{viewing.customerPhone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-semibold text-foreground">
                  ${viewing.total.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Payment</span>
                <span className="text-foreground capitalize">{viewing.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="text-foreground">
                  {new Date(viewing.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="border-t border-border pt-3">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Shipping Address
                </p>
                <p className="text-foreground">
                  {viewing.shippingAddress.street}, {viewing.shippingAddress.city},
                  {viewing.shippingAddress.state && ` ${viewing.shippingAddress.state},`}
                  {" "}{viewing.shippingAddress.zip}, {viewing.shippingAddress.country}
                </p>
              </div>

              <div className="border-t border-border pt-3">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Items ({viewing.items.reduce((s, i) => s + i.quantity, 0)})
                </p>
                <div className="space-y-2">
                  {viewing.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity} × ${item.price.toLocaleString()}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-medium text-foreground tabular-nums">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
