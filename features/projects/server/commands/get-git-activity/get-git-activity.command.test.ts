import { describe, expect, it } from "vitest";
import { GetGitActivityCommand } from "./get-git-activity.command";

describe("GetGitActivityCommand", () => {
	it("constructs correct HTTP request for contributions endpoint", () => {
		const command = new GetGitActivityCommand({
			username: "v1tor2003",
		});
		const http = command.toHttp();

		expect(http.method).toBe("GET");
		expect(http.path).toBe("/v4/v1tor2003?y=last");
		expect(http.headers?.Accept).toBe("application/json");
		expect(http.headers?.["User-Agent"]).toBe("vitor-portfolio-app");
	});

	it("defaults to username v1tor2003 if input omitted", () => {
		const command = new GetGitActivityCommand({});
		const http = command.toHttp();

		expect(http.path).toBe("/v4/v1tor2003?y=last");
	});
});
