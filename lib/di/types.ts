/**
 * A central registry of dependency injection type tokens.
 *
 * These symbols are used with InversifyJS to bind and retrieve service implementations.
 */
export const DI_TYPES = {
	IProjectsService: Symbol.for("IProjectsService"),
	IResumeService: Symbol.for("IResumeService"),
	IEmailService: Symbol.for("IEmailService"),
	IRateLimiter: Symbol.for("IRateLimiter"),
	IGitHubService: Symbol.for("IGitHubService"),
	IGitActivityService: Symbol.for("IGitActivityService"),
	IProjectsCatalogService: Symbol.for("IProjectsCatalogService"),
	GitHubApiClient: Symbol.for("GitHubPersonalClient"),
	GitHubPersonalClient: Symbol.for("GitHubPersonalClient"),
	GitHubWorkClient: Symbol.for("GitHubWorkClient"),
	GitHubContributionsApiClient: Symbol.for("GitHubContributionsApiClient"),
	ResendApiClient: Symbol.for("ResendApiClient"),
} as const;

export type DiTypes = typeof DI_TYPES;
