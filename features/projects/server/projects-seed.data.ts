import type {
	GitActivityData,
	GitActivityDay,
	Project,
} from "../schemas/project.schema";

export const SEED_PERSONAL_PROJECTS: Project[] = [
	{
		id: "command-api",
		name: "@v1tor2003/command-api",
		description:
			"Lightweight, command-based HTTP abstraction layer with strictly-typed transports, CQRS ergonomics, and result unwrapping.",
		category: "personal",
		htmlUrl: "https://github.com/v1tor2003/command-api",
		stars: 14,
		forks: 2,
		language: "TypeScript",
		topics: [
			"typescript",
			"clean-architecture",
			"http-client",
			"solid",
			"cqrs",
		],
		isPinned: true,
		hasReadme: true,
		owner: "v1tor2003",
		repo: "command-api",
	},
	{
		id: "portfolio",
		name: "portfolio",
		description:
			"Developer portfolio built with Next.js 16, Tailwind CSS, Framer Motion, and Cyberpunk terminal aesthetics.",
		category: "personal",
		htmlUrl: "https://github.com/v1tor2003/portfolio",
		stars: 8,
		forks: 1,
		language: "TypeScript",
		topics: ["nextjs", "react", "tailwind", "framer-motion", "cyberpunk"],
		isPinned: true,
		hasReadme: true,
		owner: "v1tor2003",
		repo: "portfolio",
	},
	{
		id: "ai-agent-governance",
		name: "ai-agent-governance",
		description:
			"Standardized rules, architectural constraints, and lifecycle workflows for autonomous coding agents.",
		category: "personal",
		htmlUrl: "https://github.com/v1tor2003/portfolio",
		stars: 5,
		forks: 0,
		language: "Markdown",
		topics: ["ai", "agents", "governance", "scrum", "tdd"],
		isPinned: false,
		hasReadme: true,
		owner: "v1tor2003",
		repo: "portfolio",
	},
	{
		id: "grpc-service-mesh-starter",
		name: "grpc-service-mesh-starter",
		description:
			"Reference starter template for polyglot microservices communicating via protobuf contracts and Envoy proxy.",
		category: "personal",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 6,
		forks: 1,
		language: "Go",
		topics: ["grpc", "protobuf", "microservices", "envoy"],
		isPinned: false,
		hasReadme: true,
		owner: "v1tor2003",
		repo: "grpc-service-mesh-starter",
	},
	{
		id: "clean-dotnet-template",
		name: "clean-dotnet-template",
		description:
			"Clean Architecture solution template for .NET 9 Web APIs with vertical slice architecture, MediatR, and FluentValidation.",
		category: "personal",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 9,
		forks: 3,
		language: "C#",
		topics: ["dotnet", "csharp", "clean-architecture", "mediatr"],
		isPinned: false,
		hasReadme: true,
		owner: "v1tor2003",
		repo: "clean-dotnet-template",
	},
	{
		id: "kafka-telemetry-consumer",
		name: "kafka-telemetry-consumer",
		description:
			"Low-latency streaming consumer benchmark comparing Sarama and confluent-kafka-go with zero-copy deserialization.",
		category: "personal",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 4,
		forks: 0,
		language: "Go",
		topics: ["kafka", "go", "telemetry", "streaming"],
		isPinned: false,
		hasReadme: true,
		owner: "v1tor2003",
		repo: "kafka-telemetry-consumer",
	},
	{
		id: "distributed-lock-redis",
		name: "distributed-lock-redis",
		description:
			"Redlock implementation in TypeScript with automated token renewal and lease timeouts for distributed task safety.",
		category: "personal",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 7,
		forks: 1,
		language: "TypeScript",
		topics: ["redis", "distributed-systems", "typescript", "redlock"],
		isPinned: false,
		hasReadme: true,
		owner: "v1tor2003",
		repo: "distributed-lock-redis",
	},
	{
		id: "event-driven-saga-orchestrator",
		name: "event-driven-saga-orchestrator",
		description:
			"State machine orchestrator managing long-running distributed workflows with automated compensating transactions.",
		category: "personal",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 11,
		forks: 2,
		language: "TypeScript",
		topics: ["saga", "orchestrator", "events", "state-machine"],
		isPinned: false,
		hasReadme: true,
		owner: "v1tor2003",
		repo: "event-driven-saga-orchestrator",
	},
	{
		id: "react-cyberpunk-terminal",
		name: "react-cyberpunk-terminal",
		description:
			"Retro CRT terminal simulator component with sound effects, command auto-completion, and ANSI escape rendering.",
		category: "personal",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 12,
		forks: 3,
		language: "TypeScript",
		topics: ["react", "cyberpunk", "terminal", "ui-component"],
		isPinned: false,
		hasReadme: true,
		owner: "v1tor2003",
		repo: "react-cyberpunk-terminal",
	},
	{
		id: "graphql-gateway-federation",
		name: "graphql-gateway-federation",
		description:
			"Apollo Federation v2 subgraphs aggregator with dynamic schema composition and distributed query planner.",
		category: "personal",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 3,
		forks: 0,
		language: "TypeScript",
		topics: ["graphql", "federation", "apollo", "microservices"],
		isPinned: false,
		hasReadme: true,
		owner: "v1tor2003",
		repo: "graphql-gateway-federation",
	},
	{
		id: "opentelemetry-collector-pipeline",
		name: "opentelemetry-collector-pipeline",
		description:
			"Production-grade OpenTelemetry collector recipes for distributed traces, Prometheus metrics, and Loki log ingestion.",
		category: "personal",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 5,
		forks: 0,
		language: "Yaml",
		topics: ["opentelemetry", "observability", "prometheus", "loki"],
		isPinned: false,
		hasReadme: true,
		owner: "v1tor2003",
		repo: "opentelemetry-collector-pipeline",
	},
];

export const SEED_WORK_PROJECTS: Project[] = [
	{
		id: "enterprise-event-streaming-gateway",
		name: "enterprise-event-streaming-gateway",
		description:
			"High-throughput telemetry ingestion engine processing 10k+ msgs/sec with Kafka, Redis cluster, and event deduplication.",
		category: "work",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 0,
		forks: 0,
		language: "Go",
		topics: [
			"distributed-systems",
			"kafka",
			"redis",
			"telemetry",
			"event-driven",
		],
		isPinned: true,
		hasReadme: true,
		owner: "enterprise",
		repo: "event-streaming-gateway",
	},
	{
		id: "distributed-fulfillment-engine",
		name: "distributed-fulfillment-engine",
		description:
			"Distributed transactional fulfillment service implementing Saga patterns, idempotent retry policies, and gRPC contracts.",
		category: "work",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 0,
		forks: 0,
		language: "C#",
		topics: ["dotnet", "grpc", "saga-pattern", "clean-architecture", "outbox"],
		isPinned: true,
		hasReadme: true,
		owner: "enterprise",
		repo: "fulfillment-engine",
	},
	{
		id: "enterprise-identity-mesh",
		name: "enterprise-identity-mesh",
		description:
			"OAuth2 / OIDC token exchange proxy and policy enforcement point with sub-5ms caching and distributed OpenTelemetry tracing.",
		category: "work",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 0,
		forks: 0,
		language: "TypeScript",
		topics: ["oauth2", "oidc", "security", "zero-trust", "open-telemetry"],
		isPinned: false,
		hasReadme: true,
		owner: "enterprise",
		repo: "identity-mesh",
	},
	{
		id: "cloud-billing-reconciliation",
		name: "cloud-billing-reconciliation",
		description:
			"Idempotent billing reconciliation pipeline matching Stripe and ERP ledgers with automated difference alerts.",
		category: "work",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 0,
		forks: 0,
		language: "C#",
		topics: ["fintech", "reconciliation", "dotnet", "sql-server"],
		isPinned: false,
		hasReadme: true,
		owner: "enterprise",
		repo: "billing-reconciliation",
	},
	{
		id: "realtime-asset-tracking-broker",
		name: "realtime-asset-tracking-broker",
		description:
			"WebSocket and MQTT message broker managing 50k+ active device connections with geospatial indexing in Redis.",
		category: "work",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 0,
		forks: 0,
		language: "Go",
		topics: ["iot", "mqtt", "websockets", "geospatial"],
		isPinned: false,
		hasReadme: true,
		owner: "enterprise",
		repo: "asset-tracking-broker",
	},
	{
		id: "enterprise-feature-flag-service",
		name: "enterprise-feature-flag-service",
		description:
			"Low-latency feature toggling service with client SDKs, canary rollout percentages, and audit trails.",
		category: "work",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 0,
		forks: 0,
		language: "TypeScript",
		topics: ["feature-flags", "ab-testing", "caching", "enterprise"],
		isPinned: false,
		hasReadme: true,
		owner: "enterprise",
		repo: "feature-flag-service",
	},
	{
		id: "document-indexing-worker",
		name: "document-indexing-worker",
		description:
			"Asynchronous OCR and semantic embeddings extraction pipeline processing PDF attachments into OpenSearch.",
		category: "work",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 0,
		forks: 0,
		language: "Python",
		topics: ["opensearch", "embeddings", "workers", "celery"],
		isPinned: false,
		hasReadme: true,
		owner: "enterprise",
		repo: "document-indexing-worker",
	},
	{
		id: "multi-tenant-data-partitioner",
		name: "multi-tenant-data-partitioner",
		description:
			"Dynamic PostgreSQL connection pooling and schema isolation middleware for SOC2 compliant data tenancy.",
		category: "work",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 0,
		forks: 0,
		language: "C#",
		topics: ["postgresql", "multi-tenancy", "ef-core", "security"],
		isPinned: false,
		hasReadme: true,
		owner: "enterprise",
		repo: "multi-tenant-partitioner",
	},
	{
		id: "enterprise-audit-vault",
		name: "enterprise-audit-vault",
		description:
			"Tamper-evident cryptographically signed immutable audit event log with cold-storage archiving to S3 Glacier.",
		category: "work",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 0,
		forks: 0,
		language: "Go",
		topics: ["cryptography", "audit-logs", "compliance", "aws-s3"],
		isPinned: false,
		hasReadme: true,
		owner: "enterprise",
		repo: "audit-vault",
	},
	{
		id: "api-rate-limiting-sidecar",
		name: "api-rate-limiting-sidecar",
		description:
			"Envoy WASM filter implementing token bucket and sliding log rate limiting across Kubernetes pods.",
		category: "work",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 0,
		forks: 0,
		language: "Rust",
		topics: ["rust", "wasm", "envoy", "rate-limiting"],
		isPinned: false,
		hasReadme: true,
		owner: "enterprise",
		repo: "rate-limiting-sidecar",
	},
];

export function generateGitActivityData(weeks = 52): GitActivityData {
	const days: GitActivityDay[] = [];
	const today = new Date();
	const totalDays = weeks * 7;
	let totalPersonal = 0;
	let totalWork = 0;

	// Deterministic pseudo-random sequence for consistent rendering
	for (let i = totalDays - 1; i >= 0; i--) {
		const d = new Date(today);
		d.setDate(d.getDate() - i);
		const dateStr = d.toISOString().split("T")[0];
		const dayOfWeek = d.getDay(); // 0 = Sun, 6 = Sat

		// Deterministic seed value from date string
		const seed = dateStr
			.split("-")
			.reduce((acc, part) => acc * 31 + Number.parseInt(part, 10), 7);
		const rand = (Math.sin(seed) * 10000) % 1;
		const absRand = Math.abs(rand);

		let count = 0;
		let category: "personal" | "work" | "mixed" | "none" = "none";

		if (dayOfWeek === 0 || dayOfWeek === 6) {
			// Weekends: predominantly personal open-source
			if (absRand > 0.45) {
				count = Math.floor(absRand * 8) + 1;
				category = "personal";
				totalPersonal += count;
			}
		} else {
			// Weekdays: enterprise work with occasional personal evening commits
			if (absRand > 0.2) {
				const workCount = Math.floor(absRand * 10) + 2;
				totalWork += workCount;
				count = workCount;

				if (absRand > 0.75) {
					// Mixed commit day
					const personalCount = Math.floor(absRand * 4) + 1;
					totalPersonal += personalCount;
					count += personalCount;
					category = "mixed";
				} else {
					category = "work";
				}
			} else if (absRand > 0.1) {
				count = Math.floor(absRand * 4) + 1;
				category = "personal";
				totalPersonal += count;
			}
		}

		days.push({
			date: dateStr,
			count,
			category,
		});
	}

	return {
		days,
		totalPersonal,
		totalWork,
	};
}

export const FALLBACK_READMES: Record<string, string> = {
	"v1tor2003/command-api": `# @v1tor2003/command-api

> Lightweight, command-based HTTP abstraction layer with strictly-typed transports and result unwrapping.

## Features

- **Command Pattern First**: Encapsulate every API endpoint or external integration into an isolated command.
- **Typed Transports**: Pluggable \`FetchTransport\`, Node HTTP, or custom mock test harness.
- **Result Types**: Built-in \`Result<T, E>\` unwrapping with compile-time exhaustion checks.
- **Zero Dependencies**: Core package is pure TypeScript with 0 external runtime dependencies.

## Quick Start

\`\`\`bash
pnpm add @v1tor2003/command-api
\`\`\`

\`\`\`typescript
import { BaseRequest, ApiClient, FetchTransport } from "@v1tor2003/command-api";

class GetUserCommand extends BaseRequest<{ id: string }, User> {
  toHttp() {
    return {
      method: "GET",
      path: \`/users/\${this.input.id}\`,
    };
  }
}

const client = new ApiClient({
  transport: new FetchTransport({ baseUrl: "https://api.example.com" }),
});

const result = await client.send(new GetUserCommand({ id: "42" }));
\`\`\`
`,
	"v1tor2003/portfolio": `# Portfolio

Vítor Pires - Full Stack / Distributed Systems Engineer portfolio.

Built with Next.js 16 (App Router), Tailwind CSS, Framer Motion, and Lucide Icons. Features an interactive terminal contact interface and dynamic GitHub integration.
`,
	"enterprise/event-streaming-gateway": `# Enterprise Event Streaming Gateway

High-throughput telemetry ingestion engine processing 10,000+ msgs/second.

## Architecture Highlights
- Kafka partition consumer groups with parallel worker pools
- Redis deduplication with sliding TTL windows
- Dead-letter queues (DLQ) with automated replay policies
- Distributed OpenTelemetry metrics and traces
`,
	"enterprise/fulfillment-engine": `# Distributed Order Fulfillment Engine

Distributed transactional fulfillment service implementing Saga patterns and idempotent retry policies.

## Architectural Patterns
- Clean Architecture / Hexagonal structure
- Outbox pattern for at-least-once message dispatch
- Compensation actions for multi-step transaction rollbacks
- gRPC internal service mesh communication
`,
	"enterprise/identity-mesh": `# Enterprise Identity Mesh

OAuth2 / OIDC token exchange proxy and policy enforcement point with sub-5ms caching.

## Features
- JWT verification & token exchange (RFC 8693)
- Distributed role-based access control (RBAC)
- Multi-region edge token verification cache
`,
};
