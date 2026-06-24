import { env } from "@/lib/config/env";

const PLUNK_API = "https://next-api.useplunk.com/v1/send";

interface SendEmailOptions {
  to: string;
  subject: string;
  body: string;
  reply?: string;
}

export async function sendEmail({ to, subject, body, reply }: SendEmailOptions): Promise<void> {
  if (!env.plunkSecretKey) {
    console.error("Plunk secret key not configured");
    return;
  }

  const response = await fetch(PLUNK_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.plunkSecretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to,
      subject,
      reply: reply ?? to,
      from: {
        name: "TechSphere",
        email: env.contactEmail,
      },
      body,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    console.error("Plunk API error:", JSON.stringify(result));
    throw new Error("Failed to send email");
  }

  console.log("Plunk email sent:", subject);
}
