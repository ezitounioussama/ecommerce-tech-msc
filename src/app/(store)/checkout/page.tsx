import { CheckoutForm } from "./_components/checkout-form";

export const metadata = {
  title: "Checkout - TechSphere",
  description: "Complete your purchase securely",
};

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Checkout</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review your order and complete your purchase
        </p>
      </div>
      <CheckoutForm />
    </main>
  );
}
