import { describe, expect, it } from "vitest";
import { SendResendEmailCommand } from "./send-resend-email.command";

describe("SendResendEmailCommand", () => {
	it("translates input payload into valid Resend HTTP request context", () => {
		const input = {
			from: "onboarding@resend.dev",
			to: "vitor.pr04@hotmail.com",
			reply_to: "dev@example.com",
			subject: "[Portfolio Contact] Backend Role - Alice",
			text: "Name: Alice\nEmail: dev@example.com\nSubject: Backend Role\n\nMessage:\nInterested in your background.",
		};

		const command = new SendResendEmailCommand(input);
		const http = command.toHttp();

		expect(http.method).toBe("POST");
		expect(http.path).toBe("/emails");
		expect(http.headers).toEqual({ "Content-Type": "application/json" });
		expect(http.body).toEqual(input);
	});
});
