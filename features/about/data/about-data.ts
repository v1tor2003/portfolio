import { Cpu, type LucideIcon, Server, Shield } from "lucide-react";

export interface SkillGroup {
	title: string;
	skills: readonly string[];
}

export interface HighlightItem {
	icon: LucideIcon;
	title: string;
	description: string;
}

export const SKILL_GROUPS: readonly SkillGroup[] = [
	{
		title: "// BACKEND & LANGUAGES",
		skills: ["C#", ".NET", "Node.js", "TypeScript", "Go", "REST APIs"],
	},
	{
		title: "// CLOUD & INFRASTRUCTURE",
		skills: [
			"AWS",
			"DigitalOcean",
			"Railway",
			"Azure",
			"Docker",
			"CI/CD Pipelines",
		],
	},
	{
		title: "// DATABASES & ARCHITECTURE",
		skills: [
			"PostgreSQL",
			"MongoDB",
			"Redis",
			"Microservices",
			"Distributed Systems",
			"Clean Architecture",
		],
	},
];

export const CORE_HIGHLIGHTS: readonly HighlightItem[] = [
	{
		icon: Server,
		title: "Backend Architecture",
		description:
			"Designing resilient microservices, high-throughput REST APIs, and event-driven systems in C# and TypeScript.",
	},
	{
		icon: Cpu,
		title: "Cloud & Infrastructure",
		description:
			"Deploying and managing workloads on AWS, DigitalOcean, Railway, and bare-metal VPS with Docker and CI/CD automation.",
	},
	{
		icon: Shield,
		title: "Data & System Integrity",
		description:
			"Optimizing database schemas with PostgreSQL and Redis, ensuring strict data validity, caching, and sub-millisecond query performance.",
	},
];
