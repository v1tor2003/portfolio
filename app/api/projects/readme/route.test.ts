import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/projects/readme", () => {
	it("returns 400 if owner or repo query parameters are missing", async () => {
		const request = new Request("https://localhost/api/projects/readme");
		const response = await GET(request);

		expect(response.status).toBe(400);
		const json = await response.json();
		expect(json.error).toBeDefined();
	});

	it("returns 200 with readme content for valid owner and repo", async () => {
		const request = new Request(
			"https://localhost/api/projects/readme?owner=v1tor2003&repo=command-api",
		);
		const response = await GET(request);

		expect(response.status).toBe(200);
		const json = await response.json();
		expect(json.content).toBeDefined();
		expect(json.content).toContain("@v1tor2003/command-api");
	});
});
