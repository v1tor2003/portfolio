import { describe, expect, it } from "vitest";
import {
	GitActivityDataSchema,
	ProjectCategorySchema,
	ProjectSchema,
} from "./project.schema";

describe("Project Schemas", () => {
	it("validates a valid project schema", () => {
		const validProject = {
			id: "command-api",
			name: "@v1tor2003/command-api",
			description: "Lightweight command-based HTTP abstraction layer",
			category: "personal",
			htmlUrl: "https://github.com/v1tor2003/command-api",
			stars: 12,
			forks: 2,
			language: "TypeScript",
			topics: ["typescript", "clean-architecture", "http-client"],
			isPinned: true,
			hasReadme: true,
			owner: "v1tor2003",
			repo: "command-api",
		};

		const parsed = ProjectSchema.safeParse(validProject);
		expect(parsed.success).toBe(true);
	});

	it("rejects invalid project category", () => {
		const invalidCategory = ProjectCategorySchema.safeParse("unknown");
		expect(invalidCategory.success).toBe(false);
	});

	it("validates git activity days and summary data", () => {
		const validActivity = {
			days: [
				{ date: "2026-01-01", count: 5, category: "personal" },
				{ date: "2026-01-02", count: 12, category: "work" },
			],
			totalPersonal: 5,
			totalWork: 12,
		};

		const parsed = GitActivityDataSchema.safeParse(validActivity);
		expect(parsed.success).toBe(true);
	});
});
