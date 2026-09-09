import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/env", () => ({
	env: {
		NODE_ENV: "test",
		RESEND_API_KEY: undefined as string | undefined,
		RESEND_API_LOGGING: false,
		CONTACT_TO_EMAIL: "vitor.pr04@hotmail.com",
		CONTACT_FROM_EMAIL: "onboarding@resend.dev",
	},
}));

import { env } from "@/lib/env";
import { contactRateLimiter } from "./rate-limiter";
import { ResendClientFactory } from "./resend-email.service";
import { sendContactEmail } from "./send-contact-email";

describe("sendContactEmail Server Action", () => {
	beforeEach(() => {
		(env as { RESEND_API_KEY?: string }).RESEND_API_KEY = undefined;
		ResendClientFactory._resetInstance();
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
	});

	it("rejects invalid form data and returns field errors", async () => {
		const result = await sendContactEmail({
			name: "A",
			email: "invalid-email",
			subject: "",
			message: "short",
		});

		expect(result.success).toBe(false);
		expect(result.errors).toBeDefined();
		expect(result.errors?.email).toBeDefined();
		expect(result.errors?.name).toBeDefined();
	});

	it("returns simulated success when RESEND_API_KEY is not configured", async () => {
		(env as { RESEND_API_KEY?: string }).RESEND_API_KEY = undefined;

		const result = await sendContactEmail({
			name: "Margaret Hamilton",
			email: "margaret@apollo.nasa.gov",
			subject: "Guidance Computer Software",
			message: "Interested in discussing real-time async software reliability.",
		});

		expect(result.success).toBe(true);
		expect(result.simulated).toBe(true);
		expect(result.message).toContain("Simulated mode");
	});

	it("silently drops spam submissions that fill out the honeypot", async () => {
		const result = await sendContactEmail({
			name: "Spam Bot",
			email: "bot@spam.com",
			subject: "Buy Crypto Fast",
			message: "Check out this amazing cryptocurrency offer right now!",
			botField: "I am a bot",
		});

		expect(result.success).toBe(true);
		expect(result.message).toBe("Message received.");
	});

	it("calls Resend API via command-api when RESEND_API_KEY is provided", async () => {
		(env as { RESEND_API_KEY?: string }).RESEND_API_KEY = "re_test_123456";
		ResendClientFactory._resetInstance();

		const fetchMock = vi.fn().mockResolvedValue(
			new Response(JSON.stringify({ id: "mock_resend_id" }), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			}),
		);
		vi.stubGlobal("fetch", fetchMock);

		const result = await sendContactEmail({
			name: "Linus Torvalds",
			email: "torvalds@kernel.org",
			subject: "Kernel Git Plumbing",
			message:
				"Looking at your Git activity graph and distributed system projects.",
		});

		expect(result.success).toBe(true);
		expect(result.message).toBe("Packet dispatched successfully via Resend.");
		expect(fetchMock).toHaveBeenCalledWith(
			"https://api.resend.com/emails",
			expect.objectContaining({
				method: "POST",
			}),
		);

		const headers = fetchMock.mock.calls[0][1]?.headers as Headers;
		expect(headers.get("Authorization")).toBe("Bearer re_test_123456");
		expect(headers.get("Content-Type")).toBe("application/json");
	});

	it("handles Resend API error cleanly", async () => {
		(env as { RESEND_API_KEY?: string }).RESEND_API_KEY = "re_test_123456";
		ResendClientFactory._resetInstance();

		vi.spyOn(console, "error").mockImplementation(() => {});

		const fetchMock = vi.fn().mockResolvedValue(
			new Response(JSON.stringify({ message: "Invalid API key" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			}),
		);
		vi.stubGlobal("fetch", fetchMock);

		const result = await sendContactEmail({
			name: "Linus Torvalds",
			email: "torvalds@kernel.org",
			subject: "Kernel Git Plumbing",
			message:
				"Looking at your Git activity graph and distributed system projects.",
		});

		expect(result.success).toBe(false);
		expect(result.message).toBe("Failed to dispatch email transmission.");
	});

	it("returns rate limit error when client exceeds quota", async () => {
		vi.spyOn(contactRateLimiter, "isRateLimited").mockReturnValueOnce(true);

		const result = await sendContactEmail({
			name: "Spammy Spammer",
			email: "spammer@flood.com",
			subject: "Flood Transmission",
			message: "Flooding the system with rapid requests.",
		});

		expect(result.success).toBe(false);
		expect(result.message).toContain("Rate limit exceeded");
	});
});
