import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

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

describe("POST /api/contact", () => {
  it("sends a validated message through Web3Forms", async () => {
    vi.stubEnv("WEB3FORMS_ACCESS_KEY", "test-access-key");
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ success: true }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(createRequest(validPayload));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0][0]).toBe("https://api.web3forms.com/submit");
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
      access_key: "test-access-key",
      email: "alex@example.com",
      replyto: "alex@example.com",
      message: "I have a question.",
    });
  });

  it("rejects invalid submissions without calling the provider", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(createRequest({ ...validPayload, email: "not-an-email" }));

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("reports missing provider configuration", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await POST(createRequest(validPayload));

    expect(response.status).toBe(503);
  });

  it("reports provider delivery failures instead of showing success", async () => {
    vi.stubEnv("WEB3FORMS_ACCESS_KEY", "test-access-key");
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ success: false }, { status: 400 })));

    const response = await POST(createRequest(validPayload));

    expect(response.status).toBe(502);
  });
});
