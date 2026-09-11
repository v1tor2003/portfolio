import {
	GraduationCap,
	Layers,
	type LucideIcon,
	Server,
	Workflow,
} from "lucide-react";

export interface SkillGroup {
	title: string;
	skills: readonly string[];
}

export interface HighlightItem {
	icon: LucideIcon;
	title: string;
	description: string;
	badge?: string;
}

export const SKILL_GROUPS: readonly SkillGroup[] = [
	{
		title: "// ARCHITECTURE & METHODOLOGIES",
		skills: [
			"SOLID Principles",
			"Clean Architecture",
			"DDD",
			"TDD",
			"Agile / Scrum",
			"Microservices",
			"Design Patterns",
			"Event-Driven Arch",
		],
	},
	{
		title: "// BACKEND & LANGUAGES",
		skills: [
			"C#",
			".NET",
			"Node.js",
			"TypeScript",
			"Go",
			"REST APIs",
			"GraphQL",
		],
	},
	{
		title: "// CLOUD & INFRASTRUCTURE",
		skills: [
			"AWS",
			"Docker",
			"CI/CD Pipelines",
			"DigitalOcean",
			"Railway",
			"Azure",
			"Linux",
		],
	},
	{
		title: "// DATABASES & STORAGE",
		skills: [
			"PostgreSQL",
			"Redis",
			"MongoDB",
			"Elasticsearch",
			"Entity Framework",
			"Prisma",
		],
	},
];

export const CORE_HIGHLIGHTS: readonly HighlightItem[] = [
	{
		icon: GraduationCap,
		title: "B.S. in Computer Science",
		description:
			"Graduate of Universidade Estadual de Santa Cruz (UESC), grounded in algorithmic analysis, distributed systems, operating systems, and computer science theory.",
		badge: "UESC ALUMNUS",
	},
	{
		icon: Layers,
		title: "SOLID, Clean & DDD Architecture",
		description:
			"Engineering scalable, decoupled applications by strictly applying SOLID principles, Clean Architecture layers, and Domain-Driven Design (DDD) with expressive domain logic.",
		badge: "ARCHITECTURAL RIGOR",
	},
	{
		icon: Workflow,
		title: "TDD & Agile Delivery",
		description:
			"High familiarity with Agile / Scrum team ceremonies, leveraging Test-Driven Development (TDD) for rapid feedback loops, defect prevention, and regression-free delivery.",
		badge: "SCRUM & TDD",
	},
	{
		icon: Server,
		title: "Backend & Cloud Systems",
		description:
			"Designing resilient, high-throughput microservices and REST APIs in C#, .NET, Node.js, and TypeScript, backed by AWS infrastructure and automated CI/CD pipelines.",
		badge: "HIGH AVAILABILITY",
	},
];
