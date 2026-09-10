import { BaseRequest, type HttpRequestContext } from "@v1tor2003/command-api";

export interface GetProjectReadmeInput {
	owner: string;
	repo: string;
	token?: string;
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
		const headers: Record<string, string> = {
			Accept: "application/vnd.github.v3+json",
			"User-Agent": "vitor-portfolio-app",
		};

		if (this.input.token) {
			headers.Authorization = `Bearer ${this.input.token}`;
		}

		return {
			method: "GET",
			path: `/repos/${this.input.owner}/${this.input.repo}/readme`,
			headers,
		};
	}
}
