"use server";

import { z } from "zod";
import { env } from "@/lib/config/env";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactState = {
  success: boolean;
  error?: string;
  fields?: {
    name: string;
    email: string;
    company: string;
    message: string;
  };
};

const PLUNK_API = "https://next-api.useplunk.com/v1/send";

export async function sendContactMessage(
  prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    company: formData.get("company") as string,
    message: formData.get("message") as string,
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return {
      success: false,
      error: firstError.message,
      fields: raw,
    };
  }

  const { name, email, company, message } = parsed.data;

  if (!env.plunkSecretKey || !env.contactEmail) {
    console.error("Plunk secret key or contact email not configured");
    return {
      success: false,
      error: "Message could not be sent. Please try again later.",
      fields: raw,
    };
  }

  const companyText = company ? `\nCompany: ${company}` : "";

  try {
    const response = await fetch(PLUNK_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.plunkSecretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: env.contactEmail,
        subject: `New Contact Form Message from ${name}`,
        reply: email,
        body: `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="padding:8px;font-weight:bold">Name:</td><td style="padding:8px">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Email:</td><td style="padding:8px">${email}</td></tr>
            ${company ? `<tr><td style="padding:8px;font-weight:bold">Company:</td><td style="padding:8px">${company}</td></tr>` : ""}
          </table>
          <h3>Message:</h3>
          <p style="white-space:pre-wrap">${message}</p>
        `,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("Plunk API error:", result);
      return {
        success: false,
        error: "Message could not be sent. Please try again later.",
        fields: raw,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send contact email via Plunk:", error);
    return {
      success: false,
      error: "Message could not be sent. Please try again later.",
      fields: raw,
    };
  }
}
