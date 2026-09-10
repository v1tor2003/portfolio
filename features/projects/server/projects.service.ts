import { ApiClient, FetchTransport, isOk } from "@v1tor2003/command-api";
import { env } from "@/lib/env";
import type {
	GitActivityData,
	GitActivityDay,
	Project,
	ProjectCategory,
} from "../schemas/project.schema";
import { GetGitActivityCommand } from "./get-git-activity.command";
import { GetPinnedProjectsCommand } from "./get-pinned-projects.command";
import { GetProjectReadmeCommand } from "./get-project-readme.command";
import {
	FALLBACK_READMES,
	generateGitActivityData,
	SEED_PERSONAL_PROJECTS,
	SEED_WORK_PROJECTS,
} from "./projects-seed.data";

export interface PaginatedProjectsResult {
	projects: Project[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export interface IProjectsService {
	getProjects(category?: ProjectCategory): Promise<Project[]>;
	getPaginatedProjects(options?: {
		category?: ProjectCategory;
		page?: number;
		limit?: number;
	}): Promise<PaginatedProjectsResult>;
	getGitActivity(): Promise<GitActivityData>;
	getReadme(owner: string, repo: string): Promise<string>;
}

export interface ProjectsServiceDependencies {
	client?: ApiClient;
	contributionsClient?: ApiClient;
	token?: string;
	workToken?: string;
	username?: string;
	workUsername?: string;
}

function defaultCreateGitHubClient(): ApiClient {
	return new ApiClient({
		transport: new FetchTransport({
			baseUrl: "https://api.github.com",
		}),
	});
}

function defaultCreateContributionsClient(): ApiClient {
	return new ApiClient({
		transport: new FetchTransport({
			baseUrl: "https://github-contributions-api.jogruber.de",
		}),
	});
}

export class ProjectsService implements IProjectsService {
	private readonly client: ApiClient;
	private readonly contributionsClient: ApiClient;
	private readonly token?: string;
	private readonly workToken?: string;
	private readonly username: string;
	private readonly workUsername: string;

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
		this.contributionsClient =
			deps?.contributionsClient ?? defaultCreateContributionsClient();
		this.token = deps?.token ?? env.GITHUB_TOKEN ?? env.GITHUB_RESUME_TOKEN;
		this.workToken = deps?.workToken ?? env.GITHUB_WORK_TOKEN;
		this.username = deps?.username ?? "v1tor2003";
		this.workUsername =
			deps?.workUsername ?? env.GITHUB_WORK_USERNAME ?? "vitor-pires_tecnosul";
	}

	async getProjects(category?: ProjectCategory): Promise<Project[]> {
		const allProjects = await this.fetchAllProjects();
		if (!category) return allProjects;
		return allProjects.filter((p) => p.category === category);
	}

	async getPaginatedProjects(options?: {
		category?: ProjectCategory;
		page?: number;
		limit?: number;
	}): Promise<PaginatedProjectsResult> {
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
			const command = new GetGitActivityCommand({ username: this.username });
			const [result, realWorkMap] = await Promise.all([
				this.contributionsClient.send(command).catch(() => null),
				this.fetchRealWorkContributions(),
			]);

			const personalContributions =
				result && isOk(result) && Array.isArray(result.data?.contributions)
					? result.data.contributions
					: [];

			if (personalContributions.length > 0 || realWorkMap) {
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

	private async fetchRealWorkContributions(): Promise<Map<
		string,
		number
	> | null> {
		if (!this.workToken) return null;
		try {
			const query = `
				query {
					viewer {
						contributionsCollection {
							contributionCalendar {
								weeks {
									contributionDays {
										date
										contributionCount
									}
								}
							}
						}
					}
				}
			`;
			const res = await fetch("https://api.github.com/graphql", {
				method: "POST",
				headers: {
					Authorization: `bearer ${this.workToken}`,
					"User-Agent": "vitor-portfolio-app",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ query }),
			});
			if (!res.ok) return null;
			const data = (await res.json()) as {
				data?: {
					viewer?: {
						contributionsCollection?: {
							contributionCalendar?: {
								weeks?: Array<{
									contributionDays?: Array<{
										date: string;
										contributionCount: number;
									}>;
								}>;
							};
						};
					};
				};
			};

			const weeks =
				data?.data?.viewer?.contributionsCollection?.contributionCalendar
					?.weeks;
			if (!weeks) return null;

			const map = new Map<string, number>();
			for (const week of weeks) {
				if (week.contributionDays) {
					for (const day of week.contributionDays) {
						if (day.contributionCount > 0) {
							map.set(day.date, day.contributionCount);
						}
					}
				}
			}
			return map;
		} catch {
			return null;
		}
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

		const days: GitActivityDay[] = [];
		let totalPersonal = 0;
		let totalWork = 0;

		for (let i = totalDays - 1; i >= 0; i--) {
			const d = new Date(today);
			d.setDate(d.getDate() - i);
			const dateStr = d.toISOString().split("T")[0];
			const dayOfWeek = d.getDay(); // 0 = Sun, 6 = Sat

			const personalCount = contributionMap.get(dateStr) ?? 0;
			totalPersonal += personalCount;

			let workCount = 0;
			if (realWorkContributionsMap) {
				workCount = realWorkContributionsMap.get(dateStr) ?? 0;
				totalWork += workCount;
			} else {
				// Deterministic enterprise activity fallback for weekdays
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

			const [result, pinnedSet] = await Promise.all([
				this.client.send(command),
				this.fetchPinnedRepoNames(),
			]);

			if (
				isOk(result) &&
				Array.isArray(result.data) &&
				result.data.length > 0
			) {
				const remoteRepos = result.data;
				// Merge or map fetched repositories
				const mapped: Project[] = remoteRepos
					.filter(
						(repo) =>
							!repo.name.startsWith(".") &&
							repo.name.toLowerCase() !== this.username.toLowerCase(),
					) // Filter config/hidden/profile repos
					.map((repo) => {
						const existing = SEED_PERSONAL_PROJECTS.find(
							(p) => p.repo.toLowerCase() === repo.name.toLowerCase(),
						);

						const isPinned =
							pinnedSet.has(repo.name.toLowerCase()) ||
							Boolean(existing?.isPinned);

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
							isPinned,
							hasReadme: true,
							owner: repo.owner.login,
							repo: repo.name,
						};
					});

				// Sort pinned repositories to the top, then sort by stars descending
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

	private async fetchPinnedRepoNames(): Promise<Set<string>> {
		const pinnedNames = new Set<string>();

		if (this.token) {
			try {
				const query = `
					query($username: String!) {
						user(login: $username) {
							pinnedItems(first: 10, types: REPOSITORY) {
								nodes {
									... on Repository {
										name
									}
								}
							}
						}
					}
				`;
				const res = await fetch("https://api.github.com/graphql", {
					method: "POST",
					headers: {
						Authorization: `Bearer ${this.token}`,
						"Content-Type": "application/json",
						"User-Agent": "vitor-portfolio-app",
					},
					body: JSON.stringify({
						query,
						variables: { username: this.username },
					}),
				});

				if (res.ok) {
					const json = await res.json();
					const nodes = json.data?.user?.pinnedItems?.nodes;
					if (Array.isArray(nodes)) {
						for (const node of nodes) {
							if (node?.name) {
								pinnedNames.add(node.name.toLowerCase());
							}
						}
						if (pinnedNames.size > 0) {
							return pinnedNames;
						}
					}
				}
			} catch {
				// Fallback to scraping
			}
		}

		try {
			const res = await fetch(`https://github.com/${this.username}`, {
				headers: {
					"User-Agent": "vitor-portfolio-app",
				},
			});
			if (res.ok) {
				const html = await res.text();
				const regex = new RegExp(
					`class="pinned-item-list-item-content"[\\s\\S]*?href="/${this.username}/([^"/]+)"`,
					"g",
				);
				const matches = Array.from(html.matchAll(regex));
				for (const m of matches) {
					if (m[1] && m[1].toLowerCase() !== this.username.toLowerCase()) {
						pinnedNames.add(m[1].toLowerCase());
					}
				}
				if (pinnedNames.size > 0) {
					return pinnedNames;
				}
			}
		} catch {
			// Fallback to seed pinned list
		}

		for (const p of SEED_PERSONAL_PROJECTS) {
			if (p.isPinned) {
				pinnedNames.add(p.repo.toLowerCase());
			}
		}

		return pinnedNames;
	}
}

let cachedProjectsService: IProjectsService | null = null;

export function getProjectsService(): IProjectsService {
	if (!cachedProjectsService) {
		cachedProjectsService = new ProjectsService();
	}
	return cachedProjectsService;
}
