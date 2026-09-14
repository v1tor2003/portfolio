import "reflect-metadata";
import { ApiClient, FetchTransport } from "@v1tor2003/command-api";
import { Container } from "inversify";
import type { IEmailService, IRateLimiter } from "@/features/contact";
import { InMemoryRateLimiter } from "@/features/contact/server/services/rate-limiter";
import { ResendEmailService } from "@/features/contact/server/services/resend-email.service";
import type {
	IGitActivityService,
	IProjectsCatalogService,
	IProjectsService,
} from "@/features/projects";
import { GitActivityService } from "@/features/projects/server/services/git-activity.service";
import { ProjectsService } from "@/features/projects/server/services/projects.service";
import { ProjectsCatalogService } from "@/features/projects/server/services/projects-catalog.service";
import type { IResumeService } from "@/features/resume";
import { ResumeService } from "@/features/resume/server/services/resume.service";
import { env } from "@/lib/env";
import type { IGitHubService } from "@/lib/github";
import { GitHubService } from "@/lib/github/github.service";
import { DI_TYPES } from "./types";

const container = new Container();

// --- API Clients ---
container
	.bind<ApiClient>(DI_TYPES.GitHubApiClient)
	.toDynamicValue(
		() =>
			new ApiClient({
				transport: new FetchTransport({
					baseUrl: "https://api.github.com",
					headers: {
						Accept: "application/vnd.github.v3+json",
						"User-Agent": "vitor-portfolio-app",
					},
				}),
			}),
	)
	.inSingletonScope();

container
	.bind<ApiClient>(DI_TYPES.GitHubContributionsApiClient)
	.toDynamicValue(
		() =>
			new ApiClient({
				transport: new FetchTransport({
					baseUrl: "https://github-contributions-api.jogruber.de",
				}),
			}),
	)
	.inSingletonScope();

container.bind<ApiClient>(DI_TYPES.ResendApiClient).toDynamicValue(
	() =>
		new ApiClient({
			transport: new FetchTransport({
				baseUrl: "https://api.resend.com",
				headers: {
					Authorization: `Bearer ${env.RESEND_API_KEY}`,
				},
			}),
			logging: env.RESEND_API_LOGGING ?? true,
		}),
);

// --- Infrastructure & Domain Services ---
container
	.bind<IGitHubService>(DI_TYPES.IGitHubService)
	.toDynamicValue(
		() =>
			new GitHubService(
				container.get<ApiClient>(DI_TYPES.GitHubApiClient),
				container.get<ApiClient>(DI_TYPES.GitHubContributionsApiClient),
			),
	)
	.inSingletonScope();

container
	.bind<IProjectsCatalogService>(DI_TYPES.IProjectsCatalogService)
	.toDynamicValue(
		() =>
			new ProjectsCatalogService(
				container.get<IGitHubService>(DI_TYPES.IGitHubService),
			),
	)
	.inSingletonScope();

container
	.bind<IGitActivityService>(DI_TYPES.IGitActivityService)
	.toDynamicValue(
		() =>
			new GitActivityService(
				container.get<IGitHubService>(DI_TYPES.IGitHubService),
			),
	)
	.inSingletonScope();

container
	.bind<IProjectsService>(DI_TYPES.IProjectsService)
	.toDynamicValue(
		() =>
			new ProjectsService(
				container.get<IProjectsCatalogService>(
					DI_TYPES.IProjectsCatalogService,
				),
				container.get<IGitActivityService>(DI_TYPES.IGitActivityService),
			),
	)
	.inSingletonScope();

container
	.bind<IResumeService>(DI_TYPES.IResumeService)
	.toDynamicValue(
		() =>
			new ResumeService(container.get<IGitHubService>(DI_TYPES.IGitHubService)),
	)
	.inSingletonScope();

container
	.bind<IEmailService>(DI_TYPES.IEmailService)
	.toDynamicValue(
		() =>
			new ResendEmailService(() =>
				container.get<ApiClient>(DI_TYPES.ResendApiClient),
			),
	)
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
