import { ApiClient, FetchTransport } from "@v1tor2003/command-api";
import { describe, expect, it, vi } from "vitest";
import { GitHubService } from "./github.service";

describe("GitHubService", () => {
	it("initializes with default options", () => {
		const service = new GitHubService();
		expect(service).toBeDefined();
	});

	it("returns decoded file buffer when client returns base64 content", async () => {
		const mockClient = new ApiClient({
			transport: new FetchTransport({ baseUrl: "https://api.github.com" }),
		});
		const rawText = "PDF mock content";
		const base64 = Buffer.from(rawText).toString("base64");

		vi.spyOn(mockClient, "send").mockResolvedValue({
			data: { content: base64, encoding: "base64" },
			error: null,
		});

		const service = new GitHubService({
			client: mockClient,
			token: "mock-token",
		});

		const result = await service.getFile("v1tor2003", "resume", "test.pdf");
		expect(result).toBeDefined();
		expect(result?.toString("utf-8")).toBe(rawText);
	});

	it("returns null when file command fails or token is missing", async () => {
		const serviceWithoutToken = new GitHubService({ token: undefined });
		const result = await serviceWithoutToken.getFile("owner", "repo", "path");
		expect(result).toBeNull();
	});

	it("returns decoded readme when client returns valid response", async () => {
		const mockClient = new ApiClient({
			transport: new FetchTransport({ baseUrl: "https://api.github.com" }),
		});
		const rawReadme = "# My Repository Readme";
		const base64 = Buffer.from(rawReadme).toString("base64");

		vi.spyOn(mockClient, "send").mockResolvedValue({
			data: { content: base64, encoding: "base64" },
			error: null,
		});

		const service = new GitHubService({
			client: mockClient,
			token: "mock-token",
		});

		const result = await service.getProjectReadme("v1tor2003", "my-repo");
		expect(result).toBe(rawReadme);
	});

	it("returns fallback readme when client fails", async () => {
		const mockClient = new ApiClient({
			transport: new FetchTransport({ baseUrl: "https://api.github.com" }),
		});
		vi.spyOn(mockClient, "send").mockResolvedValue({
			data: null,
			error: new Error("Network error"),
		});

		const service = new GitHubService({ client: mockClient });
		const result = await service.getProjectReadme("owner", "repo");
		expect(result).toContain("Explore details at [GitHub Repository]");
	});

	it("returns contributions from contributions client", async () => {
		const mockClient = new ApiClient({
			transport: new FetchTransport({
				baseUrl: "https://github-contributions-api.jogruber.de",
			}),
		});
		const sampleContributions = [{ date: "2026-01-01", count: 5 }];

		vi.spyOn(mockClient, "send").mockResolvedValue({
			data: { contributions: sampleContributions },
			error: null,
		});

		const service = new GitHubService({ contributionsClient: mockClient });
		const result = await service.getPersonalContributions("v1tor2003");
		expect(result).toEqual(sampleContributions);
	});
});
