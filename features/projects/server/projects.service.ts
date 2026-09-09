import { ApiClient, FetchTransport, isOk } from "@v1tor2003/command-api";
import { env } from "@/lib/env";
import type {
	GitActivityData,
	Project,
	ProjectCategory,
} from "../schemas/project.schema";
import { GetPinnedProjectsCommand } from "./get-pinned-projects.command";
import { GetProjectReadmeCommand } from "./get-project-readme.command";
import {
	FALLBACK_READMES,
	generateGitActivityData,
	SEED_PERSONAL_PROJECTS,
	SEED_WORK_PROJECTS,
} from "./projects-seed.data";

export interface IProjectsService {
	getProjects(category?: ProjectCategory): Promise<Project[]>;
	getGitActivity(): Promise<GitActivityData>;
	getReadme(owner: string, repo: string): Promise<string>;
}

export interface ProjectsServiceDependencies {
	client?: ApiClient;
	token?: string;
	username?: string;
}

function defaultCreateGitHubClient(): ApiClient {
	return new ApiClient({
		transport: new FetchTransport({
			baseUrl: "https://api.github.com",
		}),
	});
}

export class ProjectsService implements IProjectsService {
	private readonly client: ApiClient;
	private readonly token?: string;
	private readonly username: string;

	// In-memory cache for projects & readmes to minimize external network requests
	private cachedProjects: { data: Project[]; timestamp: number } | null = null;
	private cachedActivity: { data: GitActivityData; timestamp: number } | null =
		null;
	private readonly readmeCache = new Map<
		string,
		{ content: string; timestamp: number }
	>();
	private readonly CACHE_TTL_MS = 1000 * 60 * 15; // 15 minutes

	constructor(deps?: ProjectsServiceDependencies) {
		this.client = deps?.client ?? defaultCreateGitHubClient();
		this.token = deps?.token ?? env.GITHUB_TOKEN ?? env.GITHUB_RESUME_TOKEN;
		this.username = deps?.username ?? "v1tor2003";
	}

	async getProjects(category?: ProjectCategory): Promise<Project[]> {
		const allProjects = await this.fetchAllProjects();
		if (!category) return allProjects;
		return allProjects.filter((p) => p.category === category);
	}

	async getGitActivity(): Promise<GitActivityData> {
		const now = Date.now();
		if (
			this.cachedActivity &&
			now - this.cachedActivity.timestamp < this.CACHE_TTL_MS
		) {
			return this.cachedActivity.data;
		}

		// Enterprise activity is not accessible via public GitHub API endpoints.
		// In accordance with architecture guidelines, generate deterministic structured activity graph.
		const activity = generateGitActivityData(52);
		this.cachedActivity = { data: activity, timestamp: now };
		return activity;
	}

	async getReadme(owner: string, repo: string): Promise<string> {
		const cacheKey = `${owner}/${repo}`;
		const now = Date.now();
		const cached = this.readmeCache.get(cacheKey);
		if (cached && now - cached.timestamp < this.CACHE_TTL_MS) {
			return cached.content;
		}

		// Try fetching from GitHub API if owner is not enterprise
		if (owner !== "enterprise") {
			try {
				const command = new GetProjectReadmeCommand({
					owner,
					repo,
					token: this.token,
				});

				const result = await this.client.send(command);

				if (isOk(result) && result.data) {
					const data = result.data;
					if (data.content && data.encoding === "base64") {
						const decoded = Buffer.from(
							data.content.replace(/\s+/g, ""),
							"base64",
						).toString("utf-8");
						this.readmeCache.set(cacheKey, {
							content: decoded,
							timestamp: now,
						});
						return decoded;
					}
				}
			} catch {
				// Silently fallback on network or parsing error
			}
		}

		// Fallback to embedded readme
		const fallback =
			FALLBACK_READMES[cacheKey] ||
			`# ${repo}\n\nDocumentation is being synchronized. Explore details at [GitHub Repository](https://github.com/${owner}/${repo}).`;
		this.readmeCache.set(cacheKey, { content: fallback, timestamp: now });
		return fallback;
	}

	private async fetchAllProjects(): Promise<Project[]> {
		const now = Date.now();
		if (
			this.cachedProjects &&
			now - this.cachedProjects.timestamp < this.CACHE_TTL_MS
		) {
			return this.cachedProjects.data;
		}

		let personalProjects = [...SEED_PERSONAL_PROJECTS];

		// Attempt remote GitHub fetch if client/token exists or public fetch is allowed
		try {
			const command = new GetPinnedProjectsCommand({
				username: this.username,
				token: this.token,
			});

			const result = await this.client.send(command);

			if (
				isOk(result) &&
				Array.isArray(result.data) &&
				result.data.length > 0
			) {
				const remoteRepos = result.data;
				// Merge or map fetched repositories
				const mapped: Project[] = remoteRepos
					.filter((repo) => !repo.name.startsWith(".")) // Filter config/hidden repos
					.slice(0, 10)
					.map((repo) => {
						const existing = SEED_PERSONAL_PROJECTS.find(
							(p) => p.repo.toLowerCase() === repo.name.toLowerCase(),
						);

						return {
							id: repo.name,
							name:
								repo.name === "command-api"
									? "@v1tor2003/command-api"
									: repo.name,
							description:
								repo.description ||
								existing?.description ||
								"Open source project by Vítor Pires",
							category: "personal" as const,
							htmlUrl: repo.html_url,
							stars: repo.stargazers_count,
							forks: repo.forks_count,
							language: repo.language || existing?.language || "TypeScript",
							topics:
								repo.topics && repo.topics.length > 0
									? repo.topics
									: existing?.topics || ["typescript", "open-source"],
							isPinned: existing ? existing.isPinned : false,
							hasReadme: true,
							owner: repo.owner.login,
							repo: repo.name,
						};
					});

				// Keep featured repos like command-api pinned at the top
				const pinnedFirst = mapped.sort((a, b) => {
					if (a.isPinned && !b.isPinned) return -1;
					if (!a.isPinned && b.isPinned) return 1;
					return b.stars - a.stars;
				});

				if (pinnedFirst.length > 0) {
					personalProjects = pinnedFirst;
				}
			}
		} catch {
			// Resilient fallback to seed projects
		}

		const combined = [...personalProjects, ...SEED_WORK_PROJECTS];
		this.cachedProjects = { data: combined, timestamp: now };
		return combined;
	}
}

let cachedProjectsService: IProjectsService | null = null;

export function getProjectsService(): IProjectsService {
	if (!cachedProjectsService) {
		cachedProjectsService = new ProjectsService();
	}
	return cachedProjectsService;
}
