import { ApiClient, FetchTransport, isOk } from "@v1tor2003/command-api";
import { injectable } from "inversify";
import {
	FALLBACK_READMES,
	HISTORICAL_WORK_CONTRIBUTIONS,
} from "@/features/projects/data/projects-seed.data";
import { GetGitActivityCommand } from "@/features/projects/server/commands/get-git-activity/get-git-activity.command";
import { GetPinnedProjectsCommand } from "@/features/projects/server/commands/get-pinned-projects/get-pinned-projects.command";
import { GetProjectReadmeCommand } from "@/features/projects/server/commands/get-project-readme/get-project-readme.command";
import { FetchResumeCommand } from "@/features/resume/server/commands/fetch-resume/fetch-resume.command";
import { env } from "@/lib/env";
import {
	decodeBase64Buffer,
	decodeBase64Result,
	fetchGraphQLWorkContributions,
	fetchPinnedRepoNamesFromGraphQL,
	fetchPinnedRepoNamesFromScraping,
} from "./github.helpers";
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

			if (!isOk(result) || !Array.isArray(result.data)) return [];

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
		} catch {
			return [];
		}
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
				const decoded = decodeBase64Result(result);
				if (decoded) return decoded;
			} catch {
				// Resilient fallback
			}
		}

		return (
			FALLBACK_READMES[`${owner}/${repo}`] ||
			`# ${repo}\n\nDocumentation is being synchronized. Explore details at [GitHub Repository](https://github.com/${owner}/${repo}).`
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
			return decodeBase64Buffer(result);
		} catch {
			return null;
		}
	}

	async getPersonalContributions(
		username = this.username,
	): Promise<GitHubContributionDay[]> {
		try {
			const command = new GetGitActivityCommand({ username });
			const result = await this.contributionsClient
				.send(command)
				.catch(() => null);

			if (result && isOk(result) && Array.isArray(result.data?.contributions)) {
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
			const response = await fetchGraphQLWorkContributions(this.workToken);
			const weeks =
				response?.data?.viewer?.contributionsCollection?.contributionCalendar
					?.weeks;
			if (!weeks) return map;

			for (const week of weeks) {
				if (!week.contributionDays) continue;
				for (const day of week.contributionDays) {
					if (day.contributionCount > 0) {
						const existing = map.get(day.date) ?? 0;
						map.set(day.date, Math.max(existing, day.contributionCount));
					}
				}
			}
		} catch {
			// Fallback on network/auth error
		}

		return map;
	}

	private async fetchPinnedRepoNames(username: string): Promise<Set<string>> {
		if (this.token) {
			try {
				const names = await fetchPinnedRepoNamesFromGraphQL(
					username,
					this.token,
				);
				if (names.size > 0) return names;
			} catch {
				// Fallback to scraping
			}
		}

		try {
			return await fetchPinnedRepoNamesFromScraping(username);
		} catch {
			return new Set<string>();
		}
	}
}
