import { describe, expect, it, vi } from "vitest";
import { ProjectsService } from "./projects.service";

describe("ProjectsService", () => {
	it("returns fallback personal and work projects when github client is not provided or fails", async () => {
		const service = new ProjectsService({
			token: undefined,
		});

		const personalProjects = await service.getProjects("personal");
		expect(personalProjects.length).toBeGreaterThan(0);
		expect(personalProjects.every((p) => p.category === "personal")).toBe(true);

		const workProjects = await service.getProjects("work");
		expect(workProjects.length).toBeGreaterThan(0);
		expect(workProjects.every((p) => p.category === "work")).toBe(true);
	});

	it("returns git activity data with personal and work activity days", async () => {
		const service = new ProjectsService();
		const activity = await service.getGitActivity();

		expect(activity.days.length).toBeGreaterThanOrEqual(100);
		expect(activity.totalPersonal).toBeGreaterThan(0);
		expect(activity.totalWork).toBeGreaterThan(0);
	});

	it("fetches readme from remote or falls back to simulated/cached readme", async () => {
		const service = new ProjectsService();
		const readme = await service.getReadme("v1tor2003", "command-api");

		expect(readme).toBeDefined();
		expect(typeof readme).toBe("string");
		expect(readme.length).toBeGreaterThan(0);
	});

	it("returns paginated projects with correct metadata and bounds", async () => {
		const service = new ProjectsService();
		const page1 = await service.getPaginatedProjects({
			category: "personal",
			page: 1,
			limit: 4,
		});

		expect(page1.page).toBe(1);
		expect(page1.limit).toBe(4);
		expect(page1.projects.length).toBeLessThanOrEqual(4);
		expect(page1.total).toBeGreaterThanOrEqual(page1.projects.length);
		expect(page1.totalPages).toBeGreaterThanOrEqual(1);

		// Page 2
		const page2 = await service.getPaginatedProjects({
			category: "personal",
			page: 2,
			limit: 4,
		});

		expect(page2.page).toBe(2);
		expect(page2.projects.length).toBeGreaterThan(0);
		// Repos in page 1 and page 2 should not overlap
		const page1Ids = new Set(page1.projects.map((p) => p.id));
		expect(page2.projects.some((p) => page1Ids.has(p.id))).toBe(false);
	});

	it("prioritizes and sorts pinned repositories first", async () => {
		const service = new ProjectsService();
		const projects = await service.getProjects("personal");

		expect(projects.length).toBeGreaterThan(0);
		// If pinned items exist, all pinned items must appear before non-pinned items
		let foundUnpinned = false;
		for (const project of projects) {
			if (project.isPinned) {
				expect(foundUnpinned).toBe(false);
			} else {
				foundUnpinned = true;
			}
		}
	});

	it("merges real enterprise contributions from GraphQL when workToken is supplied", async () => {
		const originalFetch = globalThis.fetch;
		const mockGraphQLResponse = {
			data: {
				viewer: {
					contributionsCollection: {
						contributionCalendar: {
							weeks: [
								{
									contributionDays: [
										{
											date: "2026-08-05",
											contributionCount: 16,
										},
									],
								},
							],
						},
					},
				},
			},
		};

		globalThis.fetch = vi.fn().mockImplementation((url) => {
			if (typeof url === "string" && url.includes("/graphql")) {
				return Promise.resolve({
					ok: true,
					json: () => Promise.resolve(mockGraphQLResponse),
				});
			}
			return originalFetch(url);
		});

		try {
			const service = new ProjectsService({
				workToken: "mock-work-token",
			});
			const activity = await service.getGitActivity();
			expect(activity.totalWork).toBeGreaterThan(0);
			const targetDay = activity.days.find((d) => d.date === "2026-08-05");
			expect(targetDay).toBeDefined();
			expect(targetDay?.count).toBeGreaterThanOrEqual(16);
		} finally {
			globalThis.fetch = originalFetch;
		}
	});

	it("returns realistic AWS, NestJS, and .NET architecture mock projects for work category", async () => {
		const service = new ProjectsService();
		const workProjects = await service.getProjects("work");

		// Exactly 9 projects so they fit on a single page without pagination
		expect(workProjects.length).toBe(9);
		const allTopics = workProjects.flatMap((p) => p.topics);

		// Verifies that AWS core services and key frameworks are represented
		expect(allTopics.some((t) => t.includes("sqs"))).toBe(true);
		expect(allTopics.some((t) => t.includes("sns"))).toBe(true);
		expect(allTopics.some((t) => t.includes("s3"))).toBe(true);
		expect(allTopics.some((t) => t.includes("ses"))).toBe(true);
		expect(allTopics.some((t) => t.includes("kinesis"))).toBe(true);
		expect(allTopics.some((t) => t.includes("rds"))).toBe(true);
		expect(allTopics.some((t) => t.includes("nestjs"))).toBe(true);
		expect(allTopics.some((t) => t.includes("dotnet"))).toBe(true);
		expect(allTopics.some((t) => t.includes("cloudwatch"))).toBe(true);
	});

	it("retrieves architecture README documentation for enterprise projects", async () => {
		const service = new ProjectsService();
		const readme = await service.getReadme("enterprise", "event-mesh-sqs-sns");
		const nestReadme = await service.getReadme(
			"enterprise",
			"nestjs-fleet-telemetry-gateway",
		);
		const dotnetReadme = await service.getReadme(
			"enterprise",
			"dotnet-iot-telemetry-engine",
		);

		expect(readme).toContain("Enterprise Event Mesh (AWS SNS + SQS)");
		expect(readme).toContain("Dead-Letter Queues");
		expect(readme).toContain("CloudWatch Monitoring");

		expect(nestReadme).toContain(
			"Enterprise Fleet Telemetry Gateway (NestJS & AWS)",
		);
		expect(dotnetReadme).toContain(
			"High-Throughput IoT Telemetry Ingestion Engine (.NET 9 & AWS)",
		);
	});

	it("incorporates historical enterprise activity as a static initial baseline", async () => {
		const service = new ProjectsService({
			token: undefined,
			workToken: undefined,
		});
		const activity = await service.getGitActivity();

		// Check for presence of verified historical dates from the 2025-2026 enterprise records
		const novCommit = activity.days.find((d) => d.date === "2025-11-04");
		const julCommit = activity.days.find((d) => d.date === "2026-07-01");

		expect(novCommit).toBeDefined();
		expect(novCommit?.count).toBeGreaterThanOrEqual(1);
		expect(julCommit).toBeDefined();
		expect(julCommit?.count).toBeGreaterThanOrEqual(21);
	});
});
