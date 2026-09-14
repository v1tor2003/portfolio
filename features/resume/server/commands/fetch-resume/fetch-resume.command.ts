import { BaseRequest, type HttpRequestContext } from "@v1tor2003/command-api";

export interface FetchResumeInput {
	owner: string;
	repo: string;
	path: string;
}

export interface GitHubContentFileResponse {
	name: string;
	path: string;
	sha: string;
	size: number;
	encoding?: "base64" | string;
	content?: string;
	download_url?: string | null;
}

export class FetchResumeCommand extends BaseRequest<
	FetchResumeInput,
	GitHubContentFileResponse
> {
	toHttp(): HttpRequestContext {
		return {
			method: "GET",
			path: `/repos/${this.input.owner}/${this.input.repo}/contents/${this.input.path}`,
			headers: {
				Accept: "application/vnd.github.v3+json",
				"User-Agent": "vitor-portfolio-app",
			},
		};
	}
}
