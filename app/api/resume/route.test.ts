import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/resume Route Handler", () => {
	it("returns 200 with inline PDF headers by default", async () => {
		const request = new Request("https://localhost/api/resume");
		const response = await GET(request);

		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toBe("application/pdf");
		expect(response.headers.get("Content-Disposition")).toContain("inline");
		expect(response.headers.get("Content-Disposition")).toContain(
			"vitor-pires-resume-en.pdf",
		);

		const arrayBuffer = await response.arrayBuffer();
		expect(arrayBuffer.byteLength).toBeGreaterThan(0);
	});

	it("sets attachment Content-Disposition when ?download=true is provided", async () => {
		const request = new Request("https://localhost/api/resume?download=true");
		const response = await GET(request);

		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Disposition")).toContain("attachment");
		expect(response.headers.get("Content-Disposition")).toContain(
			"vitor-pires-resume-en.pdf",
		);
	});

	it("returns pt-BR resume when ?locale=pt-BR is provided", async () => {
		const request = new Request("https://localhost/api/resume?locale=pt-BR");
		const response = await GET(request);

		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toBe("application/pdf");
		expect(response.headers.get("Content-Disposition")).toContain(
			"vitor-pires-resume-pt-BR.pdf",
		);

		const arrayBuffer = await response.arrayBuffer();
		expect(arrayBuffer.byteLength).toBeGreaterThan(0);
	});
});
