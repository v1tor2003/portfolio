import { describe, expect, it } from "vitest";
import { GetProjectReadmeCommand } from "./get-project-readme.command";

describe("GetProjectReadmeCommand", () => {
	it("constructs correct HTTP request for README", () => {
		const command = new GetProjectReadmeCommand({
			owner: "v1tor2003",
			repo: "command-api",
		});
		const http = command.toHttp();

		expect(http.method).toBe("GET");
		expect(http.path).toBe("/repos/v1tor2003/command-api/readme");
		expect(http.headers?.Accept).toBe("application/vnd.github.v3+json");
		expect(http.headers?.["User-Agent"]).toBe("vitor-portfolio-app");
	});
});
