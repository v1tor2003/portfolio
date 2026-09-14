import { type ApiClient, isOk } from "@v1tor2003/command-api";
import { inject, injectable } from "inversify";
import {
	FALLBACK_READMES,
	HISTORICAL_WORK_CONTRIBUTIONS,
} from "@/features/projects/data/projects-seed.data";
import { GetGitActivityCommand } from "@/features/projects/server/commands/get-git-activity/get-git-activity.command";
import { GetPinnedProjectsCommand } from "@/features/projects/server/commands/get-pinned-projects/get-pinned-projects.command";
import { GetProjectReadmeCommand } from "@/features/projects/server/commands/get-project-readme/get-project-readme.command";
import { FetchResumeCommand } from "@/features/resume/server/commands/fetch-resume/fetch-resume.command";
import { DI_TYPES } from "@/lib/di/types";
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

@injectable()
export class GitHubService implements IGitHubService {
	constructor(
		@inject(DI_TYPES.GitHubApiClient)
		private readonly client: ApiClient,
		@inject(DI_TYPES.GitHubContributionsApiClient)
		private readonly contributionsClient: ApiClient,
		private readonly token = env.GITHUB_PERSONAL_TOKEN,
		private readonly workToken = env.GITHUB_WORK_TOKEN,
		private readonly username = env.GITHUB_PERSONAL_USERNAME,
		private readonly workUsername = env.GITHUB_WORK_USERNAME,
	) {}

	async getPinnedRepositories(
		username = this.username,
	): Promise<GitHubRepository[]> {
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
	}

	async getProjectReadme(owner: string, repo: string): Promise<string> {
		if (owner !== "enterprise") {
			const command = new GetProjectReadmeCommand({
				owner,
				repo,
				token: this.token,
			});

			const result = await this.client.send(command);
			const decoded = decodeBase64Result(result);
			if (decoded) return decoded;
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

		const command = new FetchResumeCommand({
			owner,
			repo,
			path: filePath,
			token: this.token,
		});

		const result = await this.client.send(command);
		return decodeBase64Buffer(result);
	}

	async getPersonalContributions(
		username = this.username,
	): Promise<GitHubContributionDay[]> {
		const command = new GetGitActivityCommand({ username });
		const result = await this.contributionsClient.send(command);

		if (isOk(result) && Array.isArray(result.data?.contributions)) {
			return result.data.contributions;
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
