import { BaseRequest, type HttpRequestContext } from "@v1tor2003/command-api";

export interface GetPinnedProjectsInput {
	username?: string;
	token?: string;
}

export interface GitHubRepoApiResponse {
	id: number;
	name: string;
	full_name: string;
	description: string | null;
	html_url: string;
	stargazers_count: number;
	forks_count: number;
	language: string | null;
	topics?: string[];
	owner: {
		login: string;
		avatar_url: string;
	};
}

export class GetPinnedProjectsCommand extends BaseRequest<
	GetPinnedProjectsInput,
	GitHubRepoApiResponse[]
> {
	toHttp(): HttpRequestContext {
		const username = this.input.username ?? "v1tor2003";
		const headers: Record<string, string> = {
			Accept: "application/vnd.github.v3+json",
			"User-Agent": "vitor-portfolio-app",
		};

		if (this.input.token) {
			headers.Authorization = `Bearer ${this.input.token}`;
		}

		return {
			method: "GET",
			path: `/users/${username}/repos?sort=updated&per_page=100`,
			headers,
		};
	}
}
