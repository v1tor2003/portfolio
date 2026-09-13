import { inject, injectable } from "inversify";
import { env } from "@/lib/env";
import { DI_TYPES } from "@/lib/di/types";
import { GitHubService } from "@/lib/github/github.service";
import type { IGitHubService } from "@/lib/github/github.service.interface";
import type {
	GitActivityData,
	GitActivityDay,
	Project,
	ProjectCategory,
} from "../schemas/project.schema";
import {
	FALLBACK_READMES,
	generateGitActivityData,
	SEED_PERSONAL_PROJECTS,
	SEED_WORK_PROJECTS,
} from "./projects-seed.data";
import type {
	IProjectsService,
	PaginatedProjectsOptions,
	PaginatedProjectsResult,
} from "./projects.service.interface";

export type {
	IProjectsService,
	PaginatedProjectsOptions,
	PaginatedProjectsResult,
};

export interface ProjectsServiceDependencies {
	gitHubService?: IGitHubService;
	token?: string;
	workToken?: string;
	username?: string;
	workUsername?: string;
}

@injectable()
export class ProjectsService implements IProjectsService {
	private readonly gitHubService: IGitHubService;
	private readonly username: string;
	private readonly workUsername: string;

	// In-memory cache for projects & readmes to minimize external requests
	private cachedProjects: { data: Project[]; timestamp: number } | null = null;
	private cachedActivity: { data: GitActivityData; timestamp: number } | null =
		null;
	private readonly readmeCache = new Map<
		string,
		{ content: string; timestamp: number }
	>();
	private readonly CACHE_TTL_MS = 1000 * 60 * 15; // 15 minutes

	constructor(
		@inject(DI_TYPES.IGitHubService)
		gitHubServiceOrDeps?: IGitHubService | ProjectsServiceDependencies,
		maybeDeps?: ProjectsServiceDependencies,
	) {
		let gitHubService: IGitHubService | undefined;
		let deps: ProjectsServiceDependencies | undefined;

		if (
			gitHubServiceOrDeps &&
			"getPinnedRepositories" in gitHubServiceOrDeps
		) {
			gitHubService = gitHubServiceOrDeps as IGitHubService;
			deps = maybeDeps;
		} else {
			deps = gitHubServiceOrDeps as ProjectsServiceDependencies;
		}

		this.gitHubService =
			deps?.gitHubService ??
			gitHubService ??
			new GitHubService({
				token: deps?.token,
				workToken: deps?.workToken,
				username: deps?.username,
				workUsername: deps?.workUsername,
			});
		this.username = deps?.username ?? "v1tor2003";
		this.workUsername =
			deps?.workUsername ?? env.GITHUB_WORK_USERNAME ?? "vitor-pires_tecnosul";
	}

	async getProjects(category?: ProjectCategory): Promise<Project[]> {
		const allProjects = await this.fetchAllProjects();
		if (!category) return allProjects;
		return allProjects.filter((p) => p.category === category);
	}

	async getPaginatedProjects(
		options?: PaginatedProjectsOptions,
	): Promise<PaginatedProjectsResult> {
		const category = options?.category ?? "personal";
		const page = Math.max(1, options?.page ?? 1);
		const limit = Math.max(1, Math.min(50, options?.limit ?? 9));

		const allCategoryProjects = await this.getProjects(category);
		const total = allCategoryProjects.length;
		const totalPages = Math.ceil(total / limit) || 1;
		const clampedPage = Math.min(page, totalPages);
		const start = (clampedPage - 1) * limit;
		const projects = allCategoryProjects.slice(start, start + limit);

		return {
			projects,
			total,
			page: clampedPage,
			limit,
			totalPages,
		};
	}

	async getGitActivity(): Promise<GitActivityData> {
		const now = Date.now();
		if (
			this.cachedActivity &&
			now - this.cachedActivity.timestamp < this.CACHE_TTL_MS
		) {
			return this.cachedActivity.data;
		}

		try {
			const [personalContributions, realWorkMap] = await Promise.all([
				this.gitHubService.getPersonalContributions(this.username),
				this.gitHubService.getWorkContributions(this.workUsername),
			]);

			if (personalContributions.length > 0 || realWorkMap.size > 0) {
				const merged = this.mergeRealContributionsWithWork(
					personalContributions,
					52,
					realWorkMap,
				);
				this.cachedActivity = { data: merged, timestamp: now };
				return merged;
			}
		} catch {
			// Resilient fallback to deterministic generator
		}

		const fallbackActivity = generateGitActivityData(52);
		this.cachedActivity = { data: fallbackActivity, timestamp: now };
		return fallbackActivity;
	}

	async getReadme(owner: string, repo: string): Promise<string> {
		const cacheKey = `${owner}/${repo}`;
		const now = Date.now();
		const cached = this.readmeCache.get(cacheKey);
		if (cached && now - cached.timestamp < this.CACHE_TTL_MS) {
			return cached.content;
		}

		if (owner === "enterprise" && FALLBACK_READMES[cacheKey]) {
			const fallback = FALLBACK_READMES[cacheKey];
			this.readmeCache.set(cacheKey, { content: fallback, timestamp: now });
			return fallback;
		}

		let content: string;
		try {
			content = await this.gitHubService.getProjectReadme(owner, repo);
		} catch {
			content =
				FALLBACK_READMES[cacheKey] ||
				`# ${repo}\n\nDocumentation is being synchronized. Explore details at [GitHub Repository](https://github.com/${owner}/${repo}).`;
		}

		this.readmeCache.set(cacheKey, { content, timestamp: now });
		return content;
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

		try {
			const remoteRepos = await this.gitHubService.getPinnedRepositories(
				this.username,
			);

			if (remoteRepos.length > 0) {
				const mapped: Project[] = remoteRepos.map((repo) => {
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
						htmlUrl: repo.htmlUrl,
						stars: repo.stars,
						forks: repo.forks,
						language: repo.language || existing?.language || "TypeScript",
						topics:
							repo.topics && repo.topics.length > 0
								? repo.topics
								: existing?.topics || ["typescript", "open-source"],
						isPinned: Boolean(repo.isPinned || existing?.isPinned),
						hasReadme: true,
						owner: repo.owner.login,
						repo: repo.name,
					};
				});

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

	private mergeRealContributionsWithWork(
		contributions: Array<{ date: string; count: number }>,
		weeks = 52,
		realWorkContributionsMap?: Map<string, number> | null,
	): GitActivityData {
		const totalDays = weeks * 7;
		const today = new Date();
		const contributionMap = new Map<string, number>();
		for (const item of contributions) {
			contributionMap.set(item.date, item.count);
		}
		const hasPersonal = contributions.length > 0;

		const days: GitActivityDay[] = [];
		let totalPersonal = 0;
		let totalWork = 0;

		for (let i = totalDays - 1; i >= 0; i--) {
			const d = new Date(today);
			d.setDate(d.getDate() - i);
			const dateStr = d.toISOString().split("T")[0];
			const dayOfWeek = d.getDay(); // 0 = Sun, 6 = Sat

			let personalCount = contributionMap.get(dateStr) ?? 0;
			if (!hasPersonal) {
				const seed = dateStr
					.split("-")
					.reduce((acc, part) => acc * 31 + Number.parseInt(part, 10), 13);
				const rand = (Math.sin(seed) * 10000) % 1;
				const absRand = Math.abs(rand);
				if (dayOfWeek === 0 || dayOfWeek === 6) {
					if (absRand > 0.4) {
						personalCount = Math.floor(absRand * 6) + 1;
					}
				} else if (absRand > 0.7) {
					personalCount = Math.floor(absRand * 3) + 1;
				}
			}
			totalPersonal += personalCount;

			let workCount = 0;
			if (realWorkContributionsMap?.has(dateStr)) {
				workCount = realWorkContributionsMap.get(dateStr) ?? 0;
				totalWork += workCount;
			} else {
				if (dayOfWeek !== 0 && dayOfWeek !== 6) {
					const seed = dateStr
						.split("-")
						.reduce((acc, part) => acc * 31 + Number.parseInt(part, 10), 7);
					const rand = (Math.sin(seed) * 10000) % 1;
					const absRand = Math.abs(rand);
					if (absRand > 0.25) {
						workCount = Math.floor(absRand * 8) + 2;
						totalWork += workCount;
					}
				}
			}

			let category: GitActivityDay["category"] = "none";
			const dayTotal = personalCount + workCount;

			if (personalCount > 0 && workCount > 0) {
				category = "mixed";
			} else if (personalCount > 0) {
				category = "personal";
			} else if (workCount > 0) {
				category = "work";
			}

			days.push({
				date: dateStr,
				count: dayTotal,
				category,
			});
		}

		return {
			days,
			totalPersonal,
			totalWork,
		};
	}
}
