import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const { createTransportMock, sendMailMock } = vi.hoisted(() => ({
  createTransportMock: vi.fn(),
  sendMailMock: vi.fn(),
}));

vi.mock("nodemailer", () => ({
  default: { createTransport: createTransportMock },
}));

function createRequest(payload: unknown): Request {
  return new Request("https://walkingcaloriecalc.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

const validPayload = {
  name: "Alex Morgan",
  email: "alex@example.com",
  subject: "Question about the calculator",
  message: "I have a question.",
  botcheck: "",
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

beforeEach(() => {
  vi.clearAllMocks();
});

function stubSmtpConfig() {
  vi.stubEnv("SMTP_HOST", "smtp.example.com");
  vi.stubEnv("SMTP_PORT", "587");
  vi.stubEnv("SMTP_USER", "smtp-user");
  vi.stubEnv("SMTP_PASSWORD", "smtp-password");
  vi.stubEnv("SMTP_FROM", "website@example.com");
  vi.stubEnv("CONTACT_EMAIL", "inbox@example.com");
}

describe("POST /api/contact", () => {
  it("sends a validated message through SMTP", async () => {
    stubSmtpConfig();
    sendMailMock.mockResolvedValue({ messageId: "test-message-id" });
    createTransportMock.mockReturnValue({ sendMail: sendMailMock });

    const response = await POST(createRequest(validPayload));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(createTransportMock).toHaveBeenCalledWith(
      expect.objectContaining({
        host: "smtp.example.com",
        port: 587,
        secure: false,
        auth: { user: "smtp-user", pass: "smtp-password" },
      }),
    );
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "inbox@example.com",
        replyTo: { name: "Alex Morgan", address: "alex@example.com" },
        subject: "Question about the calculator",
        text: "Name: Alex Morgan\nEmail: alex@example.com\n\nI have a question.",
      }),
    );
  });

  it("uses implicit TLS for SMTP port 465", async () => {
    stubSmtpConfig();
    vi.stubEnv("SMTP_PORT", "465");
    sendMailMock.mockResolvedValue({ messageId: "test-message-id" });
    createTransportMock.mockReturnValue({ sendMail: sendMailMock });

    await POST(createRequest(validPayload));

    expect(createTransportMock).toHaveBeenCalledWith(expect.objectContaining({ secure: true }));
  });

  it("rejects invalid submissions without sending email", async () => {
    stubSmtpConfig();

    const response = await POST(createRequest({ ...validPayload, email: "not-an-email" }));

    expect(response.status).toBe(400);
    expect(createTransportMock).not.toHaveBeenCalled();
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it("reports missing SMTP configuration", async () => {
    vi.stubEnv("SMTP_HOST", "");
    vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await POST(createRequest(validPayload));

    expect(response.status).toBe(503);
    expect(createTransportMock).not.toHaveBeenCalled();
  });

  it("reports SMTP delivery failures instead of showing success", async () => {
    stubSmtpConfig();
    vi.spyOn(console, "error").mockImplementation(() => {});
    sendMailMock.mockRejectedValue(new Error("SMTP unavailable"));
    createTransportMock.mockReturnValue({ sendMail: sendMailMock });

    const response = await POST(createRequest(validPayload));

    expect(response.status).toBe(502);
    expect(sendMailMock).toHaveBeenCalledOnce();
  });

  it("reports invalid SMTP ports as missing configuration", async () => {
    stubSmtpConfig();
    vi.stubEnv("SMTP_PORT", "not-a-port");
    vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await POST(createRequest(validPayload));

    expect(response.status).toBe(503);
    expect(createTransportMock).not.toHaveBeenCalled();
  });
});
