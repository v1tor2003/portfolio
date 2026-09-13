import "reflect-metadata";
import { Container } from "inversify";

const container = new Container();

// Service bindings (bind concrete classes as you implement them):
// container.bind<IGitHubService>(DI_TYPES.IGitHubService).to(GitHubService).inSingletonScope();
// container.bind<IProjectsService>(DI_TYPES.IProjectsService).to(ProjectsService).inSingletonScope();
// container.bind<IResumeService>(DI_TYPES.IResumeService).to(ResumeService).inSingletonScope();
// container.bind<IEmailService>(DI_TYPES.IEmailService).to(ResendEmailService).inSingletonScope();
// container.bind<IRateLimiter>(DI_TYPES.IRateLimiter).to(InMemoryRateLimiter).inSingletonScope();

/**
 * Type-safe helper to resolve registered services from the DI container.
 */
export function resolveService<T>(serviceIdentifier: symbol): T {
	return container.get<T>(serviceIdentifier);
}

export { container };