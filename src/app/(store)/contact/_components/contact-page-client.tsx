"use client";

import { useActionState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  IconMail,
  IconPhone,
  IconHeadset,
  IconMapPin,
  IconSend,
  IconCheck,
} from "@tabler/icons-react";
import { sendContactMessage, type ContactState } from "@/actions/contact";
import { cn } from "@/lib/utils";

const contactInfo = [
  {
    icon: IconMail,
    label: "Email",
    value: "contact@techsphere.dev",
    href: "mailto:contact@techsphere.dev",
  },
  {
    icon: IconPhone,
    label: "Phone",
    value: "+1 (800) TECH-X21",
    href: "tel:+18008324921",
  },
  {
    icon: IconHeadset,
    label: "Support",
    value: "support@techsphere.dev",
    href: "mailto:support@techsphere.dev",
  },
  {
    icon: IconMapPin,
    label: "Location",
    value: "San Francisco, CA",
  },
];

const initialState: ContactState = { success: false };

export function ContactPageClient() {
  const prefersReducedMotion = useReducedMotion();
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );

  const stagger = (index: number) => ({
    initial: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -100px" as const },
    transition: {
      duration: prefersReducedMotion ? 0 : 0.4,
      delay: prefersReducedMotion ? 0 : Math.min(index * 0.1, 0.3),
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1>
          <DiaTextReveal
            text="Contact Us"
            colors={["#3B82F6", "#818cf8", "#f472b6"]}
            textColor="var(--color-foreground)"
            className="heading-1"
            once={false}
          />
        </h1>
        <p className="mt-4 text-lg text-secondary max-w-2xl mx-auto">
          We are always looking for ways to improve our products and services.
          Reach out and let us know how we can help you.
        </p>
      </motion.div>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px" as const }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="space-y-8"
        >
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <motion.div
                key={item.label}
                {...stagger(index)}
                className="flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-blue/10">
                  <Icon className="h-5 w-5 text-accent-blue" />
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-foreground transition-colors hover:text-accent-blue"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-foreground">{item.value}</p>
                  )}
                </div>
              </motion.div>
            );
            return content;
          })}

          <motion.div
            {...stagger(contactInfo.length)}
            className="pt-4"
          >
            <p className="mb-4 text-sm font-medium text-secondary">We are here</p>
            <div className="overflow-hidden rounded-xl border border-border bg-card p-2">
              <img
                src="/contact-world.svg"
                alt="World map showing our reach"
                className="w-full opacity-80"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px" as const }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
        >
          {state.success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-blue/10">
                <IconCheck className="h-8 w-8 text-accent-blue" />
              </div>
              <h3 className="heading-3 text-foreground">Message Sent!</h3>
              <p className="mt-2 text-secondary">
                Thank you for reaching out. We will get back to you shortly.
              </p>
            </motion.div>
          ) : (
            <form action={formAction} className="space-y-5">
              {state.error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  {state.error}
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  defaultValue={state.fields?.name}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  defaultValue={state.fields?.email}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Acme Inc."
                  defaultValue={state.fields?.company}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us how we can help..."
                  defaultValue={state.fields?.message}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={pending}
                className={cn(
                  "w-full gap-2",
                  pending && "cursor-not-allowed opacity-60",
                )}
              >
                <span className="flex items-center gap-2">
                  {pending ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block"
                      >
                        <IconSend className="h-4 w-4" />
                      </motion.span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <IconSend className="h-4 w-4" />
                      Submit
                    </>
                  )}
                </span>
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
