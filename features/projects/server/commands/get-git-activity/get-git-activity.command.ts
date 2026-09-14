import { BaseRequest, type HttpRequestContext } from "@v1tor2003/command-api";

export interface GetGitActivityInput {
	username?: string;
}

export interface GitHubContributionDay {
	date: string;
	count: number;
	level: number;
}

export interface GitHubContributionsApiResponse {
	total: {
		lastYear?: number;
		[year: string]: number | undefined;
	};
	contributions: GitHubContributionDay[];
}

export class GetGitActivityCommand extends BaseRequest<
	GetGitActivityInput,
	GitHubContributionsApiResponse
> {
	toHttp(): HttpRequestContext {
		const username = this.input.username ?? "v1tor2003";
		return {
			method: "GET",
			path: `/v4/${username}?y=last`,
			headers: {
				Accept: "application/json",
				"User-Agent": "vitor-portfolio-app",
			},
		};
	}
}
