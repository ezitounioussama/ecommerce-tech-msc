import Link from "next/link";
import { getOrderById } from "@/lib/data";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CheckoutSuccessClient } from "./success-client";

export const metadata = {
  title: "Order Confirmed - TechSphere",
  description: "Your order has been placed successfully",
};

export default async function CheckoutSuccessPage(props: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const searchParams = await props.searchParams;
  const { orderId } = searchParams;

  if (!orderId) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Order Reference Missing</h1>
        <p className="mt-2 text-muted-foreground">
          We couldn&apos;t find your order reference. Please check your email for confirmation.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  const order = await getOrderById(orderId);

  return <CheckoutSuccessClient order={order} />;
}
