import { describe, expect, it } from "vitest";
import { env } from "./env";

describe("Typed Environment Configuration", () => {
	it("provides default contact recipient and sender emails", () => {
		expect(env.CONTACT_TO_EMAIL).toBe("vitor.pr04@hotmail.com");
		expect(env.CONTACT_FROM_EMAIL).toBe("onboarding@resend.dev");
	});

	it("identifies valid runtime environment", () => {
		expect(["development", "test", "production"]).toContain(env.NODE_ENV);
	});
});
