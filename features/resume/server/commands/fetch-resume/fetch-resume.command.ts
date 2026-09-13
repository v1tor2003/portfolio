import { BaseRequest, type HttpRequestContext } from "@v1tor2003/command-api";

export interface FetchResumeInput {
	owner: string;
	repo: string;
	path: string;
	token?: string;
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
		const headers: Record<string, string> = {
			Accept: "application/vnd.github.v3+json",
			"User-Agent": "vitor-portfolio-app",
		};

		if (this.input.token) headers.Authorization = `Bearer ${this.input.token}`;

		return {
			method: "GET",
			path: `/repos/${this.input.owner}/${this.input.repo}/contents/${this.input.path}`,
			headers,
		};
	}
}
