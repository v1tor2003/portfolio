import { describe, expect, it } from "vitest";
import { Container } from "inversify";
import { DI_TYPES } from "./types";

describe("Dependency Injection Container", () => {
	it("defines symbols for all core service interfaces", () => {
		expect(DI_TYPES.IProjectsService).toBeDefined();
		expect(DI_TYPES.IResumeService).toBeDefined();
		expect(DI_TYPES.IEmailService).toBeDefined();
		expect(DI_TYPES.IRateLimiter).toBeDefined();
		expect(DI_TYPES.IGitHubService).toBeDefined();
	});

	it("binds and resolves services using DI_TYPES symbols", () => {
		const testContainer = new Container();
		const dummyProjectsService = {
			getProjects: async () => [],
			getPaginatedProjects: async () => ({
				projects: [],
				total: 0,
				page: 1,
				limit: 9,
				totalPages: 1,
			}),
			getGitActivity: async () => ({
				days: [],
				totalPersonal: 0,
				totalWork: 0,
			}),
			getReadme: async () => "readme",
		};

		testContainer
			.bind(DI_TYPES.IProjectsService)
			.toConstantValue(dummyProjectsService);

		const resolved = testContainer.get(DI_TYPES.IProjectsService);
		expect(resolved).toBe(dummyProjectsService);
	});
});

