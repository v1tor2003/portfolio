import { describe, expect, it } from "vitest";
import {
	FetchResumeCommand,
	type FetchResumeInput,
} from "./fetch-resume.command";

describe("FetchResumeCommand", () => {
	it("constructs correct HTTP request context without token", () => {
		const input: FetchResumeInput = {
			owner: "v1tor2003",
			repo: "resume",
			path: "vitor-pires-resume.pdf",
		};

		const command = new FetchResumeCommand(input);
		const http = command.toHttp();

		expect(http.method).toBe("GET");
		expect(http.path).toBe(
			"/repos/v1tor2003/resume/contents/vitor-pires-resume.pdf",
		);
		expect(http.headers?.Accept).toBe("application/vnd.github.v3+json");
		expect(http.headers?.Authorization).toBeUndefined();
	});

	it("includes Bearer authorization header when token is provided", () => {
		const input: FetchResumeInput = {
			owner: "v1tor2003",
			repo: "resume",
			path: "vitor-pires-resume.pdf",
			token: "ghp_secret_token",
		};

		const command = new FetchResumeCommand(input);
		const http = command.toHttp();

		expect(http.headers?.Authorization).toBe("Bearer ghp_secret_token");
	});
});
