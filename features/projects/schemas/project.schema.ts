import { z } from "zod";

export const ProjectCategorySchema = z.enum(["personal", "work"]);
export type ProjectCategory = z.infer<typeof ProjectCategorySchema>;

export const ProjectSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	description: z.string(),
	category: ProjectCategorySchema,
	htmlUrl: z.string().url(),
	stars: z.number().int().nonnegative(),
	forks: z.number().int().nonnegative(),
	language: z.string(),
	topics: z.array(z.string()),
	isPinned: z.boolean().default(false),
	hasReadme: z.boolean().default(true),
	owner: z.string().min(1).default("v1tor2003"),
	repo: z.string().min(1),
});

export type Project = z.infer<typeof ProjectSchema>;

export const GitActivityDaySchema = z.object({
	date: z.string(), // YYYY-MM-DD
	count: z.number().int().nonnegative(),
	category: z.enum(["personal", "work", "mixed", "none"]),
});

export type GitActivityDay = z.infer<typeof GitActivityDaySchema>;

export const GitActivityDataSchema = z.object({
	days: z.array(GitActivityDaySchema),
	totalPersonal: z.number().int().nonnegative(),
	totalWork: z.number().int().nonnegative(),
});

export type GitActivityData = z.infer<typeof GitActivityDataSchema>;
