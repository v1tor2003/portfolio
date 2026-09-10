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

	it("returns paginated projects with correct metadata and bounds", async () => {
		const service = new ProjectsService();
		const page1 = await service.getPaginatedProjects({
			category: "personal",
			page: 1,
			limit: 4,
		});

		expect(page1.page).toBe(1);
		expect(page1.limit).toBe(4);
		expect(page1.projects.length).toBeLessThanOrEqual(4);
		expect(page1.total).toBeGreaterThanOrEqual(page1.projects.length);
		expect(page1.totalPages).toBeGreaterThanOrEqual(1);

		// Page 2
		const page2 = await service.getPaginatedProjects({
			category: "personal",
			page: 2,
			limit: 4,
		});

		expect(page2.page).toBe(2);
		expect(page2.projects.length).toBeGreaterThan(0);
		// Repos in page 1 and page 2 should not overlap
		const page1Ids = new Set(page1.projects.map((p) => p.id));
		expect(page2.projects.some((p) => page1Ids.has(p.id))).toBe(false);
	});

	it("prioritizes and sorts pinned repositories first", async () => {
		const service = new ProjectsService();
		const projects = await service.getProjects("personal");

		expect(projects.length).toBeGreaterThan(0);
		// If pinned items exist, all pinned items must appear before non-pinned items
		let foundUnpinned = false;
		for (const project of projects) {
			if (project.isPinned) {
				expect(foundUnpinned).toBe(false);
			} else {
				foundUnpinned = true;
			}
		}
	});
});
