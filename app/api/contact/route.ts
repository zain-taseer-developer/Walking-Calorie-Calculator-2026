import { siteConfig } from "@/site.config";

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

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error("Contact form email delivery is unavailable: WEB3FORMS_ACCESS_KEY is not configured.");
    return errorResponse("Message sending is not configured yet. Please email us directly.", 503);
  }

  let providerResponse: Response;
  try {
    providerResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        replyto: email,
        subject,
        message,
        botcheck: "",
        from_name: `${siteConfig.SITE_NAME} Contact Form`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    console.error("Contact form request to Web3Forms failed.", error);
    return errorResponse("We could not send your message right now. Please try again later.", 502);
  }

  let result: unknown;
  try {
    result = await providerResponse.json();
  } catch (error) {
    console.error("Web3Forms returned an invalid response.", error);
    return errorResponse("We could not confirm that your message was sent. Please try again.", 502);
  }

  const succeeded =
    typeof result === "object" &&
    result !== null &&
    "success" in result &&
    result.success === true;

  if (!providerResponse.ok || !succeeded) {
    console.error("Web3Forms could not deliver a contact form submission.", {
      status: providerResponse.status,
    });
    return errorResponse("We could not send your message right now. Please try again later.", 502);
  }

  return Response.json({ success: true });
}
