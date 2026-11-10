import { siteConfig } from "@/site.config";
import nodemailer from "nodemailer";

const MAX_REQUEST_SIZE = 12_000;
const MAX_NAME_LENGTH = 120;
const MAX_SUBJECT_LENGTH = 180;
const MAX_MESSAGE_LENGTH = 5_000;

function getStringField(data: Record<string, unknown>, field: string): string {
  return typeof data[field] === "string" ? data[field].trim() : "";
}

function errorResponse(error: string, status: number): Response {
  return Response.json({ error }, { status });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_REQUEST_SIZE) {
    return errorResponse("Your message is too large. Please shorten it and try again.", 413);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return errorResponse("Invalid form submission. Please refresh the page and try again.", 400);
  }

  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return errorResponse("Invalid form submission. Please refresh the page and try again.", 400);
  }

  const data = payload as Record<string, unknown>;
  const name = getStringField(data, "name");
  const email = getStringField(data, "email");
  const subject = getStringField(data, "subject");
  const message = getStringField(data, "message");
  const botcheck = getStringField(data, "botcheck");

  if (botcheck) {
    return errorResponse("Invalid form submission.", 400);
  }

  if (
    !name ||
    name.length > MAX_NAME_LENGTH ||
    !email ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !subject ||
    subject.length > MAX_SUBJECT_LENGTH ||
    !message ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return errorResponse("Please check the form fields and try again.", 400);
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM;
  const to = process.env.CONTACT_EMAIL;
  if (!host || !Number.isInteger(port) || port < 1 || port > 65_535 || !user || !password || !from || !to) {
    console.error("Contact form email delivery is unavailable: SMTP settings are incomplete.");
    return errorResponse("Message sending is not configured yet. Please email us directly.", 503);
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      requireTLS: port !== 465,
      auth: { user, pass: password },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 10_000,
    });
    await transporter.sendMail({
      from: { name: `${siteConfig.SITE_NAME} Contact Form`, address: from },
      to,
      replyTo: { name, address: email },
      subject,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
  } catch (error) {
    console.error("Contact form email delivery through SMTP failed.", error);
    return errorResponse("We could not send your message right now. Please try again later.", 502);
  }

  return Response.json({ success: true });
}
