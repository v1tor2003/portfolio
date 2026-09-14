import { describe, expect, it } from "vitest";
import { GetPinnedProjectsCommand } from "./get-pinned-projects.command";

describe("GetPinnedProjectsCommand", () => {
	it("constructs correct HTTP request for user repositories", () => {
		const command = new GetPinnedProjectsCommand({
			username: "v1tor2003",
		});
		const http = command.toHttp();

		expect(http.method).toBe("GET");
		expect(http.path).toBe("/users/v1tor2003/repos?sort=updated&per_page=100");
		expect(http.headers?.Accept).toBe("application/vnd.github.v3+json");
		expect(http.headers?.["User-Agent"]).toBe("vitor-portfolio-app");
	});

	it("defaults to username v1tor2003 if omitted", () => {
		const command = new GetPinnedProjectsCommand({});
		const http = command.toHttp();

		expect(http.path).toBe("/users/v1tor2003/repos?sort=updated&per_page=100");
	});
});
