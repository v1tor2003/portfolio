import { ApiClient, FetchTransport, isOk } from "@v1tor2003/command-api";
import { injectable } from "inversify";
import { env } from "@/lib/env";
import { GetGitActivityCommand } from "@/features/projects/server/commands/get-git-activity/get-git-activity.command";
import { GetPinnedProjectsCommand } from "@/features/projects/server/commands/get-pinned-projects/get-pinned-projects.command";
import { GetProjectReadmeCommand } from "@/features/projects/server/commands/get-project-readme/get-project-readme.command";
import {
	FALLBACK_READMES,
	HISTORICAL_WORK_CONTRIBUTIONS,
} from "@/features/projects/data/projects-seed.data";
import { FetchResumeCommand } from "@/features/resume/server/commands/fetch-resume/fetch-resume.command";
import type {
	GitHubContributionDay,
	GitHubRepository,
	IGitHubService,
} from "./github.service.interface";

export interface GitHubServiceDependencies {
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
			headers: {
				Accept: "application/vnd.github.v3+json",
				"User-Agent": "vitor-portfolio-app",
			},
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

@injectable()
export class GitHubService implements IGitHubService {
	private readonly client: ApiClient;
	private readonly contributionsClient: ApiClient;
	private readonly token?: string;
	private readonly workToken?: string;
	private readonly username: string;
	private readonly workUsername: string;

	constructor(deps?: GitHubServiceDependencies) {
		this.client = deps?.client ?? defaultCreateGitHubClient();
		this.contributionsClient =
			deps?.contributionsClient ?? defaultCreateContributionsClient();
		this.token = deps?.token ?? env.GITHUB_TOKEN ?? env.GITHUB_RESUME_TOKEN;
		this.workToken = deps?.workToken ?? env.GITHUB_WORK_TOKEN;
		this.username = deps?.username ?? env.RESUME_REPO_OWNER;
		this.workUsername = deps?.workUsername ?? env.GITHUB_WORK_USERNAME;
	}

	async getPinnedRepositories(
		username = this.username,
	): Promise<GitHubRepository[]> {
		try {
			const command = new GetPinnedProjectsCommand({
				username,
				token: this.token,
			});

			const [result, pinnedSet] = await Promise.all([
				this.client.send(command),
				this.fetchPinnedRepoNames(username),
			]);

			if (
				isOk(result) &&
				Array.isArray(result.data) &&
				result.data.length > 0
			) {
				return result.data
					.filter(
						(repo) =>
							!repo.name.startsWith(".") &&
							repo.name.toLowerCase() !== username.toLowerCase(),
					)
					.map((repo) => ({
						id: repo.id,
						name: repo.name,
						fullName: repo.full_name,
						description: repo.description,
						htmlUrl: repo.html_url,
						stars: repo.stargazers_count,
						forks: repo.forks_count,
						language: repo.language,
						topics: repo.topics ?? [],
						isPinned: pinnedSet.has(repo.name.toLowerCase()),
						owner: {
							login: repo.owner.login,
							avatarUrl: repo.owner.avatar_url,
						},
					}));
			}
		} catch {
			// Resilient fallback: return empty array on failure
		}
		return [];
	}

	async getProjectReadme(owner: string, repo: string): Promise<string> {
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
						return Buffer.from(
							data.content.replace(/\s+/g, ""),
							"base64",
						).toString("utf-8");
					}
				}
			} catch {
				// Resilient fallback on error
			}
		}

		return (
			HISTORICAL_WORK_CONTRIBUTIONS &&
			(FALLBACK_READMES[`${owner}/${repo}`] ||
				`# ${repo}\n\nDocumentation is being synchronized. Explore details at [GitHub Repository](https://github.com/${owner}/${repo}).`)
		);
	}

	async getFile(
		owner: string,
		repo: string,
		filePath: string,
	): Promise<Buffer | null> {
		if (!this.token) return null;

		try {
			const command = new FetchResumeCommand({
				owner,
				repo,
				path: filePath,
				token: this.token,
			});

			const result = await this.client.send(command);

			if (isOk(result) && result.data) {
				const response = result.data;
				if (response.content && response.encoding === "base64") {
					const cleanBase64 = response.content.replace(/\s+/g, "");
					return Buffer.from(cleanBase64, "base64");
				}
			}
		} catch {
			// Silently return null on network / response error
		}

		return null;
	}

	async getPersonalContributions(
		username = this.username,
	): Promise<GitHubContributionDay[]> {
		try {
			const command = new GetGitActivityCommand({ username });
			const result = await this.contributionsClient
				.send(command)
				.catch(() => null);

			if (
				result &&
				isOk(result) &&
				Array.isArray(result.data?.contributions)
			) {
				return result.data.contributions;
			}
		} catch {
			// Fallback on error
		}

		return [];
	}

	async getWorkContributions(
		_username = this.workUsername,
	): Promise<Map<string, number>> {
		const map = new Map<string, number>(
			Object.entries(HISTORICAL_WORK_CONTRIBUTIONS),
		);
		if (!this.workToken) return map;

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

			if (!res.ok) return map;
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
			if (!weeks) return map;

			for (const week of weeks) {
				if (week.contributionDays) {
					for (const day of week.contributionDays) {
						if (day.contributionCount > 0) {
							const existing = map.get(day.date) ?? 0;
							map.set(day.date, Math.max(existing, day.contributionCount));
						}
					}
				}
			}
		} catch {
			// Fallback on network/auth error
		}

		return map;
	}

	private async fetchPinnedRepoNames(username: string): Promise<Set<string>> {
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
						variables: { username },
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
			const res = await fetch(`https://github.com/${username}`, {
				headers: {
					"User-Agent": "vitor-portfolio-app",
				},
			});
			if (res.ok) {
				const html = await res.text();
				const regex = new RegExp(
					`class="pinned-item-list-item-content"[\\s\\S]*?href="/${username}/([^"/]+)"`,
					"g",
				);
				const matches = Array.from(html.matchAll(regex));
				for (const m of matches) {
					if (m[1] && m[1].toLowerCase() !== username.toLowerCase()) {
						pinnedNames.add(m[1].toLowerCase());
					}
				}
			}
		} catch {
			// Fallback
		}

		return pinnedNames;
	}
}

