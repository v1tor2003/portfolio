import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact.schema";

describe("contactSchema", () => {
	it("accepts valid contact form inputs", () => {
		const validData = {
			name: "Ada Lovelace",
			email: "ada@example.com",
			subject: "Distributed Systems Architecture",
			message: "We would like to discuss backend engineering opportunities.",
		};

		const result = contactSchema.safeParse(validData);
		expect(result.success).toBe(true);
	});

	it("rejects invalid email formats", () => {
		const invalidEmailData = {
			name: "Alan Turing",
			email: "not-an-email",
			subject: "Backend Infrastructure",
			message: "Let us discuss high throughput systems.",
		};

		const result = contactSchema.safeParse(invalidEmailData);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues[0].message).toBe(
				"Please provide a valid email address.",
			);
		}
	});

	it("rejects too short message", () => {
		const shortMessageData = {
			name: "Grace Hopper",
			email: "grace@example.com",
			subject: "Compiler Optimization",
			message: "Too short",
		};

		const result = contactSchema.safeParse(shortMessageData);
		expect(result.success).toBe(false);
	});
});
