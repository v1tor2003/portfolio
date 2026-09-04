import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendContactEmail } from "./send-contact-email";

describe("sendContactEmail Server Action", () => {
	const originalEnv = process.env;

	beforeEach(() => {
		vi.resetModules();
		process.env = { ...originalEnv };
	});

	afterEach(() => {
		process.env = originalEnv;
		vi.restoreAllMocks();
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
		delete process.env.RESEND_API_KEY;

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

	it("calls Resend API when RESEND_API_KEY is provided", async () => {
		process.env.RESEND_API_KEY = "re_test_123456";

		const fetchMock = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({ id: "mock_resend_id" }),
		});
		vi.stubGlobal("fetch", fetchMock);

		const result = await sendContactEmail({
			name: "Linus Torvalds",
			email: "torvalds@kernel.org",
			subject: "Kernel Git Plumbing",
			message:
				"Looking at your Git activity graph and distributed system projects.",
		});

		expect(result.success).toBe(true);
		expect(fetchMock).toHaveBeenCalledWith(
			"https://api.resend.com/emails",
			expect.objectContaining({
				method: "POST",
				headers: expect.objectContaining({
					Authorization: "Bearer re_test_123456",
				}),
			}),
		);
	});
});
