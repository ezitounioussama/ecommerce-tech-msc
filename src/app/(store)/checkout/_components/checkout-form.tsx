"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { IconShoppingCart, IconArrowLeft, IconLock } from "@tabler/icons-react";
import { useCartStore } from "@/features/cart/store/cart-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toastSuccess } from "@/components/ui/alerts";

export function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCartStore();
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [customerName, setCustomerName] = useState(user?.fullName || "");
  const [customerEmail, setCustomerEmail] = useState(user?.emailAddresses[0]?.emailAddress || "");
  const [customerPhone, setCustomerPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("Morocco");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isLoaded || !user) {
        router.push("/sign-in?redirect=/checkout");
        return;
      }

      if (items.length === 0) {
        setError("Your cart is empty");
        return;
      }

      setIsSubmitting(true);
      setError("");

      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items,
            total: totalPrice(),
            customerName,
            customerEmail,
            customerPhone,
            shippingAddress: { street, city, state, zip, country },
            paymentMethod: "card",
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Payment initiation failed");
        }

        if (data.success) {
          clearCart();
          toastSuccess("Order placed successfully!");
          router.push("/");
        } else if (data.redirectUrl) {
          clearCart();
          window.location.href = data.redirectUrl;
        } else {
          throw new Error("Unexpected payment response");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setIsSubmitting(false);
      }
    },
    [
      items, totalPrice, customerName, customerEmail, customerPhone,
      street, city, state, zip, country,
      isLoaded, user, router, clearCart,
    ],
  );

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <IconLock className="mb-4 h-8 w-8 text-muted-foreground" />
        <h2 className="mb-2 text-lg font-semibold text-foreground">Sign in to checkout</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          You need to be signed in to complete your purchase
        </p>
        <Button onClick={() => router.push("/sign-in?redirect=/checkout")}>
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-5xl">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </motion.div>
      )}

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              Shipping Information
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  placeholder="John Doe"
                  className="mt-1.5"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                    placeholder="john@example.com"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    placeholder="+212 6XX XXXXXX"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                  placeholder="123 Main Street"
                  className="mt-1.5"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    placeholder="Casablanca"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State / Region</Label>
                  <Input
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Grand Casablanca"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="20000"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  placeholder="Morocco"
                  className="mt-1.5"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6 rounded-xl border border-border bg-card p-6"
          >
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Payment Method
            </h2>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                <IconLock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Test Payment (Mock)
                </p>
                <p className="text-xs text-muted-foreground">
                  Simulated 3D Secure flow for development testing
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Order Summary
            </h2>

            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <IconShoppingCart className="mb-3 h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">Your cart is empty</p>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => router.push("/products")}
                  className="mt-2"
                >
                  Browse products
                </Button>
              </div>
            ) : (
              <>
                <ul className="divide-y divide-border">
                  {items.map((item, idx) => (
                    <motion.li
                      key={item.productId}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-3 py-3"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <IconShoppingCart className="h-5 w-5 text-muted-foreground/40" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-medium text-foreground tabular-nums">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-4 space-y-2 border-t border-border pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground tabular-nums">
                      ${totalPrice().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground tabular-nums">Free</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-2 text-base font-semibold">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground tabular-nums">
                      ${totalPrice().toLocaleString()}
                    </span>
                  </div>
                  <p className="pt-1 text-[11px] text-muted-foreground">
                    Pay in MAD at checkout
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 w-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Processing...
                    </span>
                  ) : (
                    "Place Order"
                  )}
                </Button>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </form>
  );
}
