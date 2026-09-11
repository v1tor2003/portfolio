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
			"Domain-Driven Design (DDD)",
			"Test-Driven Development (TDD)",
			"Vertical Slice Architecture",
			"Event-Driven Architecture (EDA)",
			"CQRS",
			"Microservices",
			"Idempotent Processing",
			"Design Patterns",
			"Agile / Scrum",
		],
	},
	{
		title: "// BACKEND & LANGUAGES",
		skills: [
			"C#",
			".NET 8/9",
			"ASP.NET Core",
			"TypeScript",
			"NestJS",
			"Node.js",
			"Java (Spring Boot)",
			"Go",
			"REST/GraphQL APIs & gRPC",
			"SQL (T-SQL, PostgreSQL)",
		],
	},
	{
		title: "// CLOUD & INFRASTRUCTURE",
		skills: [
			"AWS",
			"AWS IoT Core",
			"Amazon Kinesis",
			"Amazon S3, SES, SQS & SNS",
			"AWS ECS & Lambda",
			"Docker",
			"Github Actions",
			"CI/CD Pipelines",
			"CloudWatch",
			"Prometheus & Grafana",
		],
	},
	{
		title: "// DATABASES & STORAGE",
		skills: [
			"Microsoft SQL Server",
			"PostgreSQL",
			"Redis & Valkey (Distributed Cache)",
			"DynamoDB",
			"TimescaleDB",
			"MongoDB",
			"Entity Framework Core",
			"Supabase",
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
