import { getDb } from ".";
import type { Product, Category, Order } from "@/types";

const DB_NAME = "techsphere";

export async function getProductsCollection() {
  const db = await getDb(DB_NAME);
  return db.collection<Product>("products");
}

export async function getCategoriesCollection() {
  const db = await getDb(DB_NAME);
  return db.collection<Category>("categories");
}

export async function getOrdersCollection() {
  const db = await getDb(DB_NAME);
  return db.collection<Order>("orders");
}
