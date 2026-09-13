import { describe, expect, it } from "vitest";
import { DI_TYPES } from "./types";
import container, { resolveService } from "./config";
import type { IProjectsService } from "@/features/projects";
import type { IResumeService } from "@/features/resume";
import type { IEmailService, IRateLimiter } from "@/features/contact";
import type { IGitHubService } from "@/lib/github";

describe("Dependency Injection Container", () => {
	it("defines symbols for all core service interfaces", () => {
		expect(DI_TYPES.IProjectsService).toBeDefined();
		expect(DI_TYPES.IResumeService).toBeDefined();
		expect(DI_TYPES.IEmailService).toBeDefined();
		expect(DI_TYPES.IRateLimiter).toBeDefined();
		expect(DI_TYPES.IGitHubService).toBeDefined();
	});

	it("resolves all core services as singletons from the container", () => {
		const gitHubService1 =
			resolveService<IGitHubService>(DI_TYPES.IGitHubService);
		const gitHubService2 =
			resolveService<IGitHubService>(DI_TYPES.IGitHubService);
		expect(gitHubService1).toBeDefined();
		expect(gitHubService1).toBe(gitHubService2);

		const projectsService1 =
			resolveService<IProjectsService>(DI_TYPES.IProjectsService);
		const projectsService2 =
			resolveService<IProjectsService>(DI_TYPES.IProjectsService);
		expect(projectsService1).toBeDefined();
		expect(projectsService1).toBe(projectsService2);

		const resumeService1 =
			resolveService<IResumeService>(DI_TYPES.IResumeService);
		const resumeService2 =
			resolveService<IResumeService>(DI_TYPES.IResumeService);
		expect(resumeService1).toBeDefined();
		expect(resumeService1).toBe(resumeService2);

		const emailService1 = resolveService<IEmailService>(DI_TYPES.IEmailService);
		const emailService2 = resolveService<IEmailService>(DI_TYPES.IEmailService);
		expect(emailService1).toBeDefined();
		expect(emailService1).toBe(emailService2);

		const rateLimiter1 = resolveService<IRateLimiter>(DI_TYPES.IRateLimiter);
		const rateLimiter2 = resolveService<IRateLimiter>(DI_TYPES.IRateLimiter);
		expect(rateLimiter1).toBeDefined();
		expect(rateLimiter1).toBe(rateLimiter2);
	});
});
