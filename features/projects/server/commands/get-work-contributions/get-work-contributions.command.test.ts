import { describe, expect, it } from "vitest";
import { GetWorkContributionsCommand } from "./get-work-contributions.command";

describe("GetWorkContributionsCommand", () => {
	it("constructs correct GraphQL POST request", () => {
		const command = new GetWorkContributionsCommand();
		const http = command.toHttp();

		expect(http.method).toBe("POST");
		expect(http.path).toBe("/graphql");
		expect(http.headers?.["Content-Type"]).toBe("application/json");
		expect(http.body).toBeDefined();
		expect(typeof (http.body as { query: string }).query).toBe("string");
		expect((http.body as { query: string }).query).toContain("contributionsCollection");
	});
});
