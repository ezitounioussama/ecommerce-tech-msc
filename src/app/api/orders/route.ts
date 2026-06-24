import { NextResponse } from "next/server";
import { getOrdersCollection } from "@/lib/mongodb/collections";

export async function GET() {
  try {
    const col = await getOrdersCollection();
    const orders = await col.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(orders);
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
