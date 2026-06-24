"use client";

import toast from "react-hot-toast";
import { motion } from "motion/react";
import { IconX, IconCircleCheck } from "@tabler/icons-react";

export function toastSuccess(message: string) {
  toast.custom(
    (t) => (
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{
          boxShadow: "0 8px 32px rgba(34,197,94,0.15), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.1)",
          transform: "perspective(800px) translateZ(0)",
        }}
        className="pointer-events-auto flex w-80 items-start gap-3 rounded-2xl border border-emerald-500/20 bg-card/90 p-4 backdrop-blur-xl"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15">
          <IconCircleCheck className="h-4 w-4 text-emerald-400" />
        </div>
        <p className="flex-1 pt-0.5 text-sm text-foreground">{message}</p>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="-mr-1 -mt-1 flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-emerald-500/10 hover:text-emerald-400"
        >
          <IconX className="h-3.5 w-3.5" />
        </button>
      </motion.div>
    ),
    { duration: 4000, position: "top-right" },
  );
}
