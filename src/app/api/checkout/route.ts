import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getOrdersCollection } from "@/lib/mongodb/collections";
import { paymentService } from "@/services/chari";
import type { CartItem, Address } from "@/types";
import crypto from "crypto";

interface CheckoutRequest {
  items: CartItem[];
  total: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  paymentMethod: "card" | "wallet";
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as CheckoutRequest;
    const {
      items,
      total,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      paymentMethod,
    } = body;

    if (!items?.length || !total || !customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const orderId = crypto.randomUUID();

    const col = await getOrdersCollection();
    await col.insertOne({
      _id: orderId,
      userId,
      items,
      total,
      status: "pending",
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      paymentMethod,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const payment = await paymentService.initiateCardPayment({
      amount: total,
      orderId,
      items,
      customerEmail,
      customerName,
    });

    await col.updateOne(
      { _id: orderId },
      {
        $set: {
          transactionId: payment.transactionId,
          updatedAt: new Date(),
        },
      },
    );

    return NextResponse.json({
      success: false,
      orderId,
      transactionId: payment.transactionId,
      redirectUrl: payment.redirectUrl,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    const message =
      error instanceof Error ? error.message : "Payment processing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
