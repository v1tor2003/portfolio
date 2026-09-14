import { BaseRequest, type HttpRequestContext } from "@v1tor2003/command-api";

export interface GetProjectReadmeInput {
	owner: string;
	repo: string;
}

export interface GitHubReadmeApiResponse {
	name: string;
	path: string;
	sha: string;
	size: number;
	encoding?: "base64" | string;
	content?: string;
	download_url?: string | null;
	html_url?: string;
}

export class GetProjectReadmeCommand extends BaseRequest<
	GetProjectReadmeInput,
	GitHubReadmeApiResponse
> {
	toHttp(): HttpRequestContext {
		return {
			method: "GET",
			path: `/repos/${this.input.owner}/${this.input.repo}/readme`,
			headers: {
				Accept: "application/vnd.github.v3+json",
				"User-Agent": "vitor-portfolio-app",
			},
		};
	}
}
