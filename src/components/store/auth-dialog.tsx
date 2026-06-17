"use client";

import { useState } from "react";
import { SignIn, SignUp } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

type AuthMode = "sign-in" | "sign-up";

export function AuthDialog() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("sign-in");

  const openSignIn = () => {
    setMode("sign-in");
    setOpen(true);
  };

  const openSignUp = () => {
    setMode("sign-up");
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={openSignIn}
          className="px-4 py-2 rounded-md text-sm font-semibold transition duration-200 bg-transparent text-secondary hover:text-primary"
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={openSignUp}
          className="px-4 py-2 rounded-md text-sm font-semibold transition duration-200 bg-accent-blue text-primary-foreground hover:bg-accent-blue/80"
        >
          Get Started
        </button>
      </div>

      <DialogContent className="w-full max-w-md p-0 overflow-visible bg-background" showCloseButton={false}>
        {mode === "sign-in" ? (
          <div className="flex flex-col">
            <div className="flex items-center justify-end p-2">
              <button
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <SignIn
              routing="hash"
              signUpUrl="#"
              fallbackRedirectUrl="/"
              appearance={{
                elements: {
                  rootBox: "mx-auto w-full",
                  card: "shadow-none border-0 bg-transparent",
                  headerTitle: "text-foreground",
                  headerSubtitle: "text-muted-foreground",
                  socialButtonsBlockButton: "border-border bg-card text-foreground hover:bg-muted",
                  dividerLine: "bg-border",
                  dividerText: "text-muted-foreground",
                  formFieldLabel: "text-foreground",
                  formFieldInput: "bg-card border-border text-foreground",
                  formButtonPrimary: "bg-accent-blue hover:bg-accent-blue/80 text-white",
                  footerAction: "hidden",
                  identityPreviewText: "text-foreground",
                  identityPreviewEditButton: "text-accent-blue",
                  otpCodeFieldInput: "bg-card border-border text-foreground",
                },
              }}
            />
            <div className="flex items-center justify-center gap-1 px-6 pb-6 text-sm text-muted-foreground">
              <span>Don't have an account?</span>
              <button
                onClick={() => setMode("sign-up")}
                className="font-medium text-accent-blue hover:text-accent-blue/80"
              >
                Sign up
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex items-center justify-end p-2">
              <button
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <SignUp
              routing="hash"
              signInUrl="#"
              fallbackRedirectUrl="/"
              appearance={{
                elements: {
                  rootBox: "mx-auto w-full",
                  card: "shadow-none border-0 bg-transparent",
                  headerTitle: "text-foreground",
                  headerSubtitle: "text-muted-foreground",
                  socialButtonsBlockButton: "border-border bg-card text-foreground hover:bg-muted",
                  dividerLine: "bg-border",
                  dividerText: "text-muted-foreground",
                  formFieldLabel: "text-foreground",
                  formFieldInput: "bg-card border-border text-foreground",
                  formButtonPrimary: "bg-accent-blue hover:bg-accent-blue/80 text-white",
                  footerAction: "hidden",
                  identityPreviewText: "text-foreground",
                  identityPreviewEditButton: "text-accent-blue",
                  otpCodeFieldInput: "bg-card border-border text-foreground",
                },
              }}
            />
            <div className="flex items-center justify-center gap-1 px-6 pb-6 text-sm text-muted-foreground">
              <span>Already have an account?</span>
              <button
                onClick={() => setMode("sign-in")}
                className="font-medium text-accent-blue hover:text-accent-blue/80"
              >
                Sign in
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
