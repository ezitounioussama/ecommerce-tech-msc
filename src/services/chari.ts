import { createCheckoutSession } from "@/services/stripe";
import type { CartItem } from "@/types";

interface PaymentRequest {
  amount: number;
  orderId: string;
  items: CartItem[];
  customerEmail: string;
  customerName: string;
}

interface PaymentResponse {
  status: string;
  transactionId: string;
  redirectUrl: string | null;
}

class StripePaymentService {
  async initiateCardPayment(
    request: PaymentRequest,
  ): Promise<PaymentResponse> {
    const session = await createCheckoutSession({
      items: request.items,
      orderId: request.orderId,
      customerEmail: request.customerEmail,
      customerName: request.customerName,
    });

    return {
      status: "pending",
      transactionId: session.sessionId,
      redirectUrl: session.url,
    };
  }
}

export const paymentService = new StripePaymentService();
