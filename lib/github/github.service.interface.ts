export interface GitHubRepository {
	id: number;
	name: string;
	fullName: string;
	description: string | null;
	htmlUrl: string;
	stars: number;
	forks: number;
	language: string | null;
	topics?: string[];
	isPinned?: boolean;
	owner: {
		login: string;
		avatarUrl?: string;
	};
}

export interface GitHubContributionDay {
	date: string;
	count: number;
}

export interface IGitHubService {
	getPinnedRepositories(username?: string): Promise<GitHubRepository[]>;
	getProjectReadme(owner: string, repo: string): Promise<string>;
	getFile(owner: string, repo: string, path: string): Promise<Buffer | null>;
	getPersonalContributions(username?: string): Promise<GitHubContributionDay[]>;
	getWorkContributions(username?: string): Promise<Map<string, number>>;
}
