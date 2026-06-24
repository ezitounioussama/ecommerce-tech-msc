interface PaymentRequest {
  amount: number;
  orderId: string;
}

interface PaymentResponse {
  status: string;
  transactionId: string;
  redirectUrl: string | null;
}

class MockPaymentService {
  async initiateCardPayment(request: PaymentRequest): Promise<PaymentResponse> {
    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 600));

    return {
      status: "completed",
      transactionId: `mock_txn_${request.orderId.slice(0, 8)}_${Date.now()}`,
      redirectUrl: null,
    };
  }
}

export const paymentService = new MockPaymentService();
