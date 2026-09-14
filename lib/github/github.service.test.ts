import { ApiClient, FetchTransport } from "@v1tor2003/command-api";
import { describe, expect, it, vi } from "vitest";
import { env } from "@/lib/env";
import { GitHubService } from "./github.service";

describe("GitHubService", () => {
	function createMockClient(): ApiClient {
		return new ApiClient({
			transport: new FetchTransport({ baseUrl: "https://api.github.com" }),
		});
	}

	it("initializes with injected clients and default env", () => {
		const service = new GitHubService(
			createMockClient(),
			createMockClient(),
			createMockClient(),
		);
		expect(service).toBeDefined();
	});

	it("returns decoded file buffer when client returns base64 content", async () => {
		const mockPersonalClient = createMockClient();
		const rawText = "PDF mock content";
		const base64 = Buffer.from(rawText).toString("base64");

		vi.spyOn(mockPersonalClient, "send").mockResolvedValue({
			data: { content: base64, encoding: "base64" },
			error: null,
		});

		const prevToken = env.GITHUB_PERSONAL_TOKEN;
		(env as { GITHUB_PERSONAL_TOKEN?: string }).GITHUB_PERSONAL_TOKEN =
			"mock-token";

		try {
			const service = new GitHubService(
				mockPersonalClient,
				createMockClient(),
				createMockClient(),
			);

			const result = await service.getFile("v1tor2003", "resume", "test.pdf");
			expect(result).toBeDefined();
			expect(result?.toString("utf-8")).toBe(rawText);
		} finally {
			(env as { GITHUB_PERSONAL_TOKEN?: string }).GITHUB_PERSONAL_TOKEN =
				prevToken;
		}
	});

	it("returns null when personal token is missing", async () => {
		const prevToken = env.GITHUB_PERSONAL_TOKEN;
		(env as { GITHUB_PERSONAL_TOKEN?: string }).GITHUB_PERSONAL_TOKEN =
			undefined;

		try {
			const service = new GitHubService(
				createMockClient(),
				createMockClient(),
				createMockClient(),
			);
			const result = await service.getFile("owner", "repo", "path");
			expect(result).toBeNull();
		} finally {
			(env as { GITHUB_PERSONAL_TOKEN?: string }).GITHUB_PERSONAL_TOKEN =
				prevToken;
		}
	});

	it("returns decoded readme when client returns valid response", async () => {
		const mockPersonalClient = createMockClient();
		const rawReadme = "# My Repository Readme";
		const base64 = Buffer.from(rawReadme).toString("base64");

		vi.spyOn(mockPersonalClient, "send").mockResolvedValue({
			data: { content: base64, encoding: "base64" },
			error: null,
		});

		const service = new GitHubService(
			mockPersonalClient,
			createMockClient(),
			createMockClient(),
		);

		const result = await service.getProjectReadme("v1tor2003", "my-repo");
		expect(result).toBe(rawReadme);
	});

	it("returns fallback readme when client fails", async () => {
		const mockPersonalClient = createMockClient();
		vi.spyOn(mockPersonalClient, "send").mockResolvedValue({
			data: null,
			error: new Error("Network error"),
		});

		const service = new GitHubService(
			mockPersonalClient,
			createMockClient(),
			createMockClient(),
		);
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
			createMockClient(),
		);
		const result = await service.getPersonalContributions("v1tor2003");
		expect(result).toEqual(sampleContributions);
	});

	it("dispatches work contributions through workClient when work token is configured", async () => {
		const mockWorkClient = createMockClient();
		const prevToken = env.GITHUB_WORK_TOKEN;
		(env as { GITHUB_WORK_TOKEN?: string }).GITHUB_WORK_TOKEN = "work-token";

		vi.spyOn(mockWorkClient, "send").mockResolvedValue({
			data: {
				data: {
					viewer: {
						contributionsCollection: {
							contributionCalendar: {
								weeks: [
									{
										contributionDays: [
											{ date: "2026-08-10", contributionCount: 8 },
										],
									},
								],
							},
						},
					},
				},
			},
			error: null,
		});

		try {
			const service = new GitHubService(
				createMockClient(),
				createMockClient(),
				mockWorkClient,
			);
			const workMap = await service.getWorkContributions();
			expect(workMap.get("2026-08-10")).toBe(8);
		} finally {
			(env as { GITHUB_WORK_TOKEN?: string }).GITHUB_WORK_TOKEN = prevToken;
		}
	});
});
