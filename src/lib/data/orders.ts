import { getOrdersCollection } from "@/lib/mongodb/collections";
import type { Order } from "@/types";

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  "use cache";
  const col = await getOrdersCollection();
  return col
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray() as Promise<Order[]>;
}

export async function getOrderById(id: string): Promise<Order | null> {
  "use cache";
  const col = await getOrdersCollection();
  return col.findOne({ _id: id }) as Promise<Order | null>;
}

export async function getOrders(): Promise<Order[]> {
  "use cache";
  const col = await getOrdersCollection();
  return col.find().sort({ createdAt: -1 }).toArray() as Promise<Order[]>;
}
