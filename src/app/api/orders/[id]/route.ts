import { NextRequest, NextResponse } from "next/server";
import { getOrdersCollection } from "@/lib/mongodb/collections";
import type { OrderStatus } from "@/types";
import { sendEmail } from "@/lib/plunk";
import { orderShippedEmail } from "@/email-templates/order-shipped";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const col = await getOrdersCollection();
    const order = await col.findOne({ _id: id });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("GET /api/orders/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = (await req.json()) as { status: OrderStatus };
    const col = await getOrdersCollection();

    const prev = await col.findOne({ _id: id });
    if (!prev) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const { status: newStatus } = body;

    await col.updateOne(
      { _id: id },
      { $set: { status: newStatus, updatedAt: new Date() } },
    );

    if (newStatus === "shipped" && prev.status !== "shipped") {
      sendEmail({
        to: prev.customerEmail,
        subject: `Your TechSphere order #${id.slice(0, 8)} has shipped!`,
        body: orderShippedEmail(prev),
      }).catch((err) => console.error("Failed to send shipped email:", err));
    }

    const updated = await col.findOne({ _id: id });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/orders/[id] error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
