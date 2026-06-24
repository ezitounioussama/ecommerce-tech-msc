"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { IconShieldLock, IconCircleCheck, IconLock } from "@tabler/icons-react";

export default function Mock3dsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [step, setStep] = useState<"verifying" | "success" | "redirecting">("verifying");

  useEffect(() => {
    if (!orderId) return;

    const t1 = setTimeout(() => setStep("success"), 1800);
    const t2 = setTimeout(() => {
      setStep("redirecting");
      router.push(`/checkout/success?orderId=${orderId}`);
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [orderId, router]);

  if (!orderId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Invalid session</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {step === "verifying" && (
            <motion.div
              key="verifying"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <IconShieldLock className="h-7 w-7 text-primary" />
              </div>
              <div className="mb-4 h-1.5 w-full max-w-[200px] overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                />
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                3D Secure Verification
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Simulating bank authentication...
              </p>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10"
              >
                <IconCircleCheck className="h-7 w-7 text-emerald-500" />
              </motion.div>
              <h2 className="text-lg font-semibold text-foreground">
                Verified Successfully
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Redirecting back to store...
              </p>
            </motion.div>
          )}

          {step === "redirecting" && (
            <motion.div
              key="redirecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              <IconLock className="mb-3 h-6 w-6 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">Completing...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
