import { describe, expect, it } from "vitest";
import { ProjectsService } from "./projects.service";

describe("ProjectsService", () => {
	it("returns fallback personal and work projects when github client is not provided or fails", async () => {
		const service = new ProjectsService({
			token: undefined,
		});

		const personalProjects = await service.getProjects("personal");
		expect(personalProjects.length).toBeGreaterThan(0);
		expect(personalProjects.every((p) => p.category === "personal")).toBe(true);

		const workProjects = await service.getProjects("work");
		expect(workProjects.length).toBeGreaterThan(0);
		expect(workProjects.every((p) => p.category === "work")).toBe(true);
	});

	it("returns git activity data with personal and work activity days", async () => {
		const service = new ProjectsService();
		const activity = await service.getGitActivity();

		expect(activity.days.length).toBeGreaterThanOrEqual(100);
		expect(activity.totalPersonal).toBeGreaterThan(0);
		expect(activity.totalWork).toBeGreaterThan(0);
	});

	it("fetches readme from remote or falls back to simulated/cached readme", async () => {
		const service = new ProjectsService();
		const readme = await service.getReadme("v1tor2003", "command-api");

		expect(readme).toBeDefined();
		expect(typeof readme).toBe("string");
		expect(readme.length).toBeGreaterThan(0);
	});
});
