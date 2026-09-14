import { ApiClient, FetchTransport } from "@v1tor2003/command-api";
import { describe, expect, it, vi } from "vitest";
import { GitHubService } from "./github.service";

describe("GitHubService", () => {
	function createMockClient(): ApiClient {
		return new ApiClient({
			transport: new FetchTransport({ baseUrl: "https://api.github.com" }),
		});
	}

	it("initializes with injected clients and default env", () => {
		const service = new GitHubService(createMockClient(), createMockClient());
		expect(service).toBeDefined();
	});

	it("returns decoded file buffer when client returns base64 content", async () => {
		const mockClient = createMockClient();
		const rawText = "PDF mock content";
		const base64 = Buffer.from(rawText).toString("base64");

		vi.spyOn(mockClient, "send").mockResolvedValue({
			data: { content: base64, encoding: "base64" },
			error: null,
		});

		const service = new GitHubService(
			mockClient,
			createMockClient(),
			"mock-token",
		);

		const result = await service.getFile("v1tor2003", "resume", "test.pdf");
		expect(result).toBeDefined();
		expect(result?.toString("utf-8")).toBe(rawText);
	});

	it("returns null when token is missing", async () => {
		const serviceWithoutToken = new GitHubService(
			createMockClient(),
			createMockClient(),
			undefined,
		);
		const result = await serviceWithoutToken.getFile("owner", "repo", "path");
		expect(result).toBeNull();
	});

	it("returns decoded readme when client returns valid response", async () => {
		const mockClient = createMockClient();
		const rawReadme = "# My Repository Readme";
		const base64 = Buffer.from(rawReadme).toString("base64");

		vi.spyOn(mockClient, "send").mockResolvedValue({
			data: { content: base64, encoding: "base64" },
			error: null,
		});

		const service = new GitHubService(
			mockClient,
			createMockClient(),
			"mock-token",
		);

		const result = await service.getProjectReadme("v1tor2003", "my-repo");
		expect(result).toBe(rawReadme);
	});

	it("returns fallback readme when client fails", async () => {
		const mockClient = createMockClient();
		vi.spyOn(mockClient, "send").mockResolvedValue({
			data: null,
			error: new Error("Network error"),
		});

		const service = new GitHubService(mockClient, createMockClient());
		const result = await service.getProjectReadme("owner", "repo");
		expect(result).toContain("Explore details at [GitHub Repository]");
	});

	it("returns contributions from contributions client", async () => {
		const mockContributionsClient = createMockClient();
		const sampleContributions = [{ date: "2026-01-01", count: 5 }];

		vi.spyOn(mockContributionsClient, "send").mockResolvedValue({
			data: { contributions: sampleContributions },
			error: null,
		});

		const service = new GitHubService(
			createMockClient(),
			mockContributionsClient,
		);
		const result = await service.getPersonalContributions("v1tor2003");
		expect(result).toEqual(sampleContributions);
	});
});
