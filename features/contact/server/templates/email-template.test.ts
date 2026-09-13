import { describe, expect, it } from "vitest";
import { buildContactEmailHtml, buildContactEmailText } from "./email-template";

describe("email-template", () => {
	const sampleData = {
		name: "Alan Turing",
		email: "alan@bletchley.ac.uk",
		subject: "Enigma Cryptanalysis",
		message: "Can machines think? Let's discuss Turing completeness.",
	};

	it("generates plain text containing all contact fields", () => {
		const text = buildContactEmailText(sampleData);

		expect(text).toContain("Name: Alan Turing");
		expect(text).toContain("Email: alan@bletchley.ac.uk");
		expect(text).toContain("Subject: Enigma Cryptanalysis");
		expect(text).toContain(
			"Message:\nCan machines think? Let's discuss Turing completeness.",
		);
	});

	it("generates styled HTML containing escaped values and monospace layout", () => {
		const html = buildContactEmailHtml(sampleData);

		expect(html).toContain("Alan Turing");
		expect(html).toContain("alan@bletchley.ac.uk");
		expect(html).toContain("Enigma Cryptanalysis");
		expect(html).toContain(
			"Can machines think? Let&#39;s discuss Turing completeness.",
		);
		expect(html).toContain("[PORTFOLIO CONTACT TRANSMISSION]");
	});

	it("escapes malicious HTML characters in inputs", () => {
		const maliciousData = {
			name: "<script>alert('xss')</script>",
			email: "evil@test.com",
			subject: "<b>Bold</b>",
			message: "<img src=x onerror=alert(1)>",
		};

		const html = buildContactEmailHtml(maliciousData);

		expect(html).not.toContain("<script>");
		expect(html).toContain("&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;");
		expect(html).not.toContain("<img");
		expect(html).toContain("&lt;img src=x onerror=alert(1)&gt;");
	});
});
