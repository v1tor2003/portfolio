import { inject, injectable } from "inversify";
import { DI_TYPES } from "@/lib/di/types";
import type { IGitHubService } from "@/lib/github/github.service.interface";
import type {
	GitHubRepository,
} from "@/lib/github/github.service.interface";
import type {
	Project,
	ProjectCategory,
} from "../schemas/project.schema";
import {
	FALLBACK_READMES,
	SEED_PERSONAL_PROJECTS,
	SEED_WORK_PROJECTS,
} from "./projects-seed.data";
import type {
	PaginatedProjectsOptions,
	PaginatedProjectsResult,
} from "./projects.service.interface";
import { env } from "@/lib/env";
import type { IProjectsCatalogService } from "./projects-catalog.service.interface";

const CACHE_TTL_MS = 1000 * 60 * 15; // 15 minutes
const DEFAULT_PAGE_LIMIT = 9;
const MAX_PAGE_LIMIT = 50;

@injectable()
export class ProjectsCatalogService implements IProjectsCatalogService {
	private cachedProjects: { data: Project[]; timestamp: number } | null = null;
	private readonly readmeCache = new Map<
		string,
		{ content: string; timestamp: number }
	>();

	constructor(
		@inject(DI_TYPES.IGitHubService)
		private readonly gitHubService: IGitHubService,
		private readonly username: string = env.RESUME_REPO_OWNER,
	) {}

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
		const limit = Math.max(1, Math.min(MAX_PAGE_LIMIT, options?.limit ?? DEFAULT_PAGE_LIMIT));

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

	async getReadme(owner: string, repo: string): Promise<string> {
		const cacheKey = `${owner}/${repo}`;
		const cached = this.getCachedReadme(cacheKey);
		if (cached !== null) return cached;

		if (owner === "enterprise" && FALLBACK_READMES[cacheKey]) {
			const fallback = FALLBACK_READMES[cacheKey];
			this.cacheReadme(cacheKey, fallback);
			return fallback;
		}

		const content = await this.fetchReadmeWithFallback(owner, repo, cacheKey);
		this.cacheReadme(cacheKey, content);
		return content;
	}

	private getCachedReadme(cacheKey: string): string | null {
		const cached = this.readmeCache.get(cacheKey);
		if (!cached) return null;
		if (Date.now() - cached.timestamp >= CACHE_TTL_MS) return null;
		
		return cached.content;
	}

	private cacheReadme(cacheKey: string, content: string): void {
		this.readmeCache.set(cacheKey, { content, timestamp: Date.now() });
	}

	private async fetchReadmeWithFallback(
		owner: string,
		repo: string,
		cacheKey: string,
	): Promise<string> {
		try {
			return await this.gitHubService.getProjectReadme(owner, repo);
		} catch {
			return (
				FALLBACK_READMES[cacheKey] ||
				`# ${repo}\n\nDocumentation is being synchronized. Explore details at [GitHub Repository](https://github.com/${owner}/${repo}).`
			);
		}
	}

	private async fetchAllProjects(): Promise<Project[]> {
		if (this.isProjectsCacheValid()) 	return this.cachedProjects!.data;
		

		const personalProjects = await this.resolvePersonalProjects();
		const combined = [...personalProjects, ...SEED_WORK_PROJECTS];
		this.cachedProjects = { data: combined, timestamp: Date.now() };
		return combined;
	}

	private isProjectsCacheValid(): boolean {
		if (!this.cachedProjects) return false;
		return Date.now() - this.cachedProjects.timestamp < CACHE_TTL_MS;
	}

	private async resolvePersonalProjects(): Promise<Project[]> {
		try {
			const remoteRepos = await this.gitHubService.getPinnedRepositories(this.username);
			if (remoteRepos.length === 0) return [...SEED_PERSONAL_PROJECTS];

			const mapped = remoteRepos.map((repo) => this.mapRepoToProject(repo));
			const sorted = this.sortPinnedFirst(mapped);
			return sorted.length > 0 ? sorted : [...SEED_PERSONAL_PROJECTS];
		} catch {
			return [...SEED_PERSONAL_PROJECTS];
		}
	}

	private mapRepoToProject(repo: GitHubRepository): Project {
		const existing = SEED_PERSONAL_PROJECTS.find(
			(p) => p.repo.toLowerCase() === repo.name.toLowerCase(),
		);

		return {
			id: repo.name,
			name: repo.name === "command-api" ? "@v1tor2003/command-api" : repo.name,
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
	}

	private sortPinnedFirst(projects: Project[]): Project[] {
		return [...projects].sort((a, b) => {
			if (a.isPinned && !b.isPinned) return -1;
			if (!a.isPinned && b.isPinned) return 1;
			return b.stars - a.stars;
		});
	}
}

