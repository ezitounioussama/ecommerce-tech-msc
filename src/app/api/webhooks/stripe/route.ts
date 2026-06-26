import { NextRequest, NextResponse } from "next/server";
import { getOrdersCollection } from "@/lib/mongodb/collections";

let stripeClient: any = null;

async function getStripe() {
  if (!stripeClient) {
    const { default: Stripe } = await import("stripe");
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
  }
  return stripeClient;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    const stripe = await getStripe();

    let event: { type: string; data: { object: Record<string, unknown> } };
    try {
      const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
      if (whSecret) {
        event = stripe.webhooks.constructEvent(body, signature ?? "", whSecret) as unknown as typeof event;
      } else {
        event = JSON.parse(body);
      }
    } catch {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as { metadata?: { orderId?: string }; id: string };
      const orderId = session.metadata?.orderId;

      if (orderId) {
        const col = await getOrdersCollection();
        await col.updateOne(
          { _id: orderId },
          { $set: { status: "confirmed", paymentId: session.id, updatedAt: new Date() } },
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
