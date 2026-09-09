import { describe, expect, it } from "vitest";
import { getResume } from "./get-resume";

describe("getResume helper", () => {
	it("retrieves the resume with valid PDF metadata and buffer", async () => {
		const resume = await getResume();

		expect(resume.contentType).toBe("application/pdf");
		expect(resume.fileName).toBe("vitor-pires-resume.pdf");
		expect(resume.buffer).toBeInstanceOf(Buffer);
		expect(resume.buffer.length).toBeGreaterThan(0);
		expect(["remote", "local-fallback"]).toContain(resume.source);
	});
});
