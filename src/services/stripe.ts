import { env } from "@/lib/config/env";
import type { CartItem } from "@/types";

let stripeClient: any = null;

async function getStripe() {
  if (!stripeClient) {
    const { default: Stripe } = await import("stripe");
    stripeClient = new Stripe(env.stripeSecretKey ?? "");
  }
  return stripeClient as { checkout: { sessions: { create: Function; retrieve: Function } } };
}

interface CreateSessionParams {
  items: CartItem[];
  orderId: string;
  customerEmail: string;
  customerName: string;
}

interface SessionResponse {
  sessionId: string;
  url: string;
}

export async function createCheckoutSession({
  items,
  orderId,
  customerEmail,
  customerName,
}: CreateSessionParams): Promise<SessionResponse> {
  const stripe = await getStripe();

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    customer_email: customerEmail,
    metadata: { orderId },
    success_url: `${env.baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.baseUrl}/checkout/cancel`,
  });

  if (!session.url) {
    throw new Error("Stripe session URL is empty");
  }

  return {
    sessionId: session.id,
    url: session.url,
  };
}

export async function verifySession(
  sessionId: string,
): Promise<{ orderId: string; status: string }> {
  const stripe = await getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  return {
    orderId: session.metadata?.orderId ?? "",
    status: session.payment_status,
  };
}
