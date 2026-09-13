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

import { ApiClient, FetchTransport } from "@v1tor2003/command-api";
import { env } from "@/lib/env";
import { ResendEmailService } from "./resend-email.service";

describe("ResendEmailService", () => {
	const sampleData = {
		name: "Grace Hopper",
		email: "hopper@navy.mil",
		subject: "Compiler Optimization",
		message: "Nanoseconds count in distributed systems.",
	};

	function createMockClient(): ApiClient {
		return new ApiClient({
			transport: new FetchTransport({
				baseUrl: "https://api.resend.com",
				headers: {
					Authorization: `Bearer ${env.RESEND_API_KEY}`,
				},
			}),
			logging: false,
		});
	}

	beforeEach(() => {
		(env as { RESEND_API_KEY?: string }).RESEND_API_KEY = undefined;
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
	});

	it("returns simulated success when RESEND_API_KEY is not configured", async () => {
		const service = new ResendEmailService(createMockClient());
		const result = await service.send(sampleData);

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.simulated).toBe(true);
		}
	});

	it("dispatches email via Resend API with html and text multipart when RESEND_API_KEY is present", async () => {
		(env as { RESEND_API_KEY?: string }).RESEND_API_KEY = "re_test_key_123";

		const fetchMock = vi.fn().mockResolvedValue(
			new Response(JSON.stringify({ id: "email_msg_456" }), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			}),
		);
		vi.stubGlobal("fetch", fetchMock);

		const service = new ResendEmailService(createMockClient());
		const result = await service.send(sampleData);

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.messageId).toBe("email_msg_456");
		}

		expect(fetchMock).toHaveBeenCalledWith(
			"https://api.resend.com/emails",
			expect.objectContaining({
				method: "POST",
			}),
		);

		const sentPayload = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
		expect(sentPayload.from).toBe("onboarding@resend.dev");
		expect(sentPayload.to).toBe("vitor.pr04@hotmail.com");
		expect(sentPayload.reply_to).toBe("hopper@navy.mil");
		expect(sentPayload.text).toContain("Nanoseconds count");
		expect(sentPayload.html).toContain("Nanoseconds count");
	});

	it("logs structured error and returns failure when API call fails", async () => {
		(env as { RESEND_API_KEY?: string }).RESEND_API_KEY = "re_test_key_123";

		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		const fetchMock = vi.fn().mockResolvedValue(
			new Response(JSON.stringify({ message: "Rate limit exceeded" }), {
				status: 429,
				headers: { "Content-Type": "application/json" },
			}),
		);
		vi.stubGlobal("fetch", fetchMock);

		const service = new ResendEmailService(createMockClient());
		const result = await service.send(sampleData);

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toContain("Rate limit exceeded");
		}

		expect(consoleSpy).toHaveBeenCalledWith(
			expect.stringContaining(
				"[ResendEmailService] Failed to dispatch transmission:",
			),
			expect.objectContaining({
				status: 429,
			}),
		);
	});
});
