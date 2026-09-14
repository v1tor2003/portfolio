import { describe, expect, it } from "vitest";
import { GetPinnedRepoNamesCommand } from "./get-pinned-repo-names.command";

describe("GetPinnedRepoNamesCommand", () => {
	it("constructs correct GraphQL POST request with username variables", () => {
		const command = new GetPinnedRepoNamesCommand({ username: "v1tor2003" });
		const http = command.toHttp();

		expect(http.method).toBe("POST");
		expect(http.path).toBe("/graphql");
		expect(http.headers?.["Content-Type"]).toBe("application/json");
		expect(http.body).toBeDefined();
		expect((http.body as { variables: { username: string } }).variables.username).toBe(
			"v1tor2003",
		);
	});
});
