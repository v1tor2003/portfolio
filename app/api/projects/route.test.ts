import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/projects", () => {
	it("returns 200 with paginated projects using default parameters", async () => {
		const request = new Request("https://localhost/api/projects");
		const response = await GET(request);

		expect(response.status).toBe(200);
		const json = await response.json();
		expect(json.projects).toBeDefined();
		expect(Array.isArray(json.projects)).toBe(true);
		expect(json.page).toBe(1);
		expect(json.limit).toBe(9);
		expect(json.total).toBeGreaterThanOrEqual(json.projects.length);
		expect(json.totalPages).toBeGreaterThanOrEqual(1);
		expect(response.headers.get("cache-control")).toContain("public");
	});

	it("filters by category and custom page bounds", async () => {
		const request = new Request(
			"https://localhost/api/projects?category=work&page=1&limit=3",
		);
		const response = await GET(request);

		expect(response.status).toBe(200);
		const json = await response.json();
		expect(json.page).toBe(1);
		expect(json.limit).toBe(3);
		expect(json.projects.length).toBeLessThanOrEqual(3);
		expect(
			json.projects.every((p: { category: string }) => p.category === "work"),
		).toBe(true);
	});

	it("returns 400 for invalid query parameters", async () => {
		const request = new Request(
			"https://localhost/api/projects?category=invalid-category",
		);
		const response = await GET(request);

		expect(response.status).toBe(400);
		const json = await response.json();
		expect(json.error).toBeDefined();
	});
});
