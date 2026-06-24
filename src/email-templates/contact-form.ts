export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export function contactFormEmail({ name, email, company, message }: ContactFormData): string {
  const companyRow = company
    ? `<tr><td style="padding:8px;font-weight:bold">Company:</td><td style="padding:8px">${company}</td></tr>`
    : "";

  return `
    <h2>New Contact Form Submission</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px">
      <tr><td style="padding:8px;font-weight:bold">Name:</td><td style="padding:8px">${name}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Email:</td><td style="padding:8px">${email}</td></tr>
      ${companyRow}
    </table>
    <h3>Message:</h3>
    <p style="white-space:pre-wrap">${message}</p>
  `;
}
