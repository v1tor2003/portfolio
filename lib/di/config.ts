import "reflect-metadata";
import { Container } from "inversify";
import { DI_TYPES } from "./types";

import type { IEmailService, IRateLimiter } from "@/features/contact";
import { InMemoryRateLimiter } from "@/features/contact/server/rate-limiter";
import { ResendEmailService } from "@/features/contact/server/resend-email.service";
import type { IProjectsService } from "@/features/projects";
import { ProjectsService } from "@/features/projects/server/projects.service";
import type { IResumeService } from "@/features/resume";
import { ResumeService } from "@/features/resume/server/resume.service";
import type { IGitHubService } from "@/lib/github";
import { GitHubService } from "@/lib/github/github.service";

const container = new Container();

container
	.bind<IGitHubService>(DI_TYPES.IGitHubService)
	.toDynamicValue(() => new GitHubService())
	.inSingletonScope();

container
	.bind<IProjectsService>(DI_TYPES.IProjectsService)
	.toDynamicValue(
		() =>
			new ProjectsService(
				container.get<IGitHubService>(DI_TYPES.IGitHubService),
			),
	)
	.inSingletonScope();

container
	.bind<IResumeService>(DI_TYPES.IResumeService)
	.toDynamicValue(
		() =>
			new ResumeService(
				container.get<IGitHubService>(DI_TYPES.IGitHubService),
			),
	)
	.inSingletonScope();

container
	.bind<IEmailService>(DI_TYPES.IEmailService)
	.toDynamicValue(() => new ResendEmailService())
	.inSingletonScope();

container
	.bind<IRateLimiter>(DI_TYPES.IRateLimiter)
	.toDynamicValue(() => new InMemoryRateLimiter())
	.inSingletonScope();

/**
 * Type-safe helper to resolve registered services from the DI container.
 */
export function resolveService<T>(serviceIdentifier: symbol): T {
	return container.get<T>(serviceIdentifier);
}

export { container };
export default container;