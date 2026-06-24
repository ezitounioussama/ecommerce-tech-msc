import { NextResponse } from "next/server";
import { getOrdersCollection } from "@/lib/mongodb/collections";

interface ChariWebhookPayload {
  event: string;
  transactionId: string;
  orderId: string;
  status: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChariWebhookPayload;
    const { event, transactionId, orderId, status } = body;

    if (!event || !transactionId || !orderId) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const col = await getOrdersCollection();

    if (event === "payment.success" && status === "completed") {
      await col.updateOne(
        { _id: orderId },
        {
          $set: {
            status: "confirmed",
            paymentId: transactionId,
            updatedAt: new Date(),
          },
        },
      );

      return NextResponse.json({ received: true });
    }

    if (event === "payment.failed") {
      await col.updateOne(
        { _id: orderId },
        {
          $set: {
            status: "cancelled",
            paymentId: transactionId,
            updatedAt: new Date(),
          },
        },
      );

      return NextResponse.json({ received: true });
    }

    await col.updateOne(
      { _id: orderId },
      {
        $set: {
          paymentId: transactionId,
          updatedAt: new Date(),
        },
      },
    );

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
