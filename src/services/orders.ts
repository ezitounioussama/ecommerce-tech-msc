import api from "@/lib/axios";
import type { Order, OrderStatus } from "@/types";

export async function getOrders(): Promise<Order[]> {
  const { data } = await api.get<Order[]>("/orders");
  return data;
}

export async function getOrder(id: string): Promise<Order> {
  const { data } = await api.get<Order>(`/orders/${id}`);
  return data;
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
): Promise<Order> {
  const { data } = await api.put<Order>(`/orders/${id}`, { status });
  return data;
}
