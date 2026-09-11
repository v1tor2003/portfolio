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
		id: "nestjs-fleet-telemetry-gateway",
		name: "nestjs-fleet-telemetry-gateway",
		description:
			"Enterprise IoT & fleet operations gateway built with NestJS, featuring ABAC/RBAC authorization kernels, AWS EventBridge domain routing, BullMQ/Valkey task processing, and TimescaleDB telemetry partitioning.",
		category: "work",
		htmlUrl: "https://github.com/vitor-pires_tecnosul",
		stars: 0,
		forks: 0,
		language: "TypeScript",
		topics: [
			"nestjs",
			"typescript",
			"aws-eventbridge",
			"aws-sqs",
			"timescaledb",
			"valkey",
			"clean-architecture",
		],
		isPinned: true,
		hasReadme: true,
		owner: "enterprise",
		repo: "nestjs-fleet-telemetry-gateway",
	},
	{
		id: "dotnet-iot-telemetry-engine",
		name: "dotnet-iot-telemetry-engine",
		description:
			"High-throughput event streaming ingestion engine built on .NET 9 and ASP.NET Core adhering to Vertical Slice Architecture (Sliced Arch), CQRS, AWS IoT Core, Kinesis, Redis distributed caching, and NBomber load testing.",
		category: "work",
		htmlUrl: "https://github.com/vitor-pires_tecnosul",
		stars: 0,
		forks: 0,
		language: "C#",
		topics: [
			"dotnet",
			"csharp",
			"vertical-slice",
			"cqrs",
			"aws-kinesis",
			"aws-iot",
			"redis",
			"nbomber",
		],
		isPinned: true,
		hasReadme: true,
		owner: "enterprise",
		repo: "dotnet-iot-telemetry-engine",
	},
	{
		id: "enterprise-event-mesh-sqs-sns",
		name: "enterprise-event-mesh-sqs-sns",
		description:
			"Decoupled asynchronous event broker leveraging Amazon SNS topic fanout, SQS subscriber queues, exponential backoff DLQs, and CloudWatch backpressure alarms.",
		category: "work",
		htmlUrl: "https://github.com/vitor-pires_tecnosul",
		stars: 0,
		forks: 0,
		language: "TypeScript",
		topics: [
			"aws-sqs",
			"aws-sns",
			"cloudwatch",
			"event-driven",
			"dead-letter-queue",
		],
		isPinned: true,
		hasReadme: true,
		owner: "enterprise",
		repo: "event-mesh-sqs-sns",
	},
	{
		id: "kinesis-realtime-telemetry-pipeline",
		name: "kinesis-realtime-telemetry-pipeline",
		description:
			"High-throughput real-time streaming ingestion pipeline handling 50k+ records/sec with AWS Kinesis Shards, CloudWatch anomaly detection, and partitioned S3 Parquet batch sink.",
		category: "work",
		htmlUrl: "https://github.com/vitor-pires_tecnosul",
		stars: 0,
		forks: 0,
		language: "Go",
		topics: ["aws-kinesis", "aws-s3", "cloudwatch", "streaming", "telemetry"],
		isPinned: true,
		hasReadme: true,
		owner: "enterprise",
		repo: "kinesis-telemetry-pipeline",
	},
	{
		id: "s3-glacier-compliance-vault",
		name: "s3-glacier-compliance-vault",
		description:
			"Tamper-evident document repository with Amazon S3 presigned multipart uploads, KMS envelope encryption, and automated lifecycle transitions to S3 Glacier Flexible Retrieval.",
		category: "work",
		htmlUrl: "https://github.com/vitor-pires_tecnosul",
		stars: 0,
		forks: 0,
		language: "TypeScript",
		topics: ["aws-s3", "s3-glacier", "kms-encryption", "compliance", "storage"],
		isPinned: false,
		hasReadme: true,
		owner: "enterprise",
		repo: "s3-glacier-compliance-vault",
	},
	{
		id: "rds-aurora-resilience-proxy",
		name: "rds-aurora-resilience-proxy",
		description:
			"Multi-tenant database connection pool manager and tenant router with AWS RDS Aurora PostgreSQL, read replica routing, and CloudWatch automated failover triggers.",
		category: "work",
		htmlUrl: "https://github.com/vitor-pires_tecnosul",
		stars: 0,
		forks: 0,
		language: "C#",
		topics: ["aws-rds", "aurora", "postgresql", "multi-tenancy", "dotnet"],
		isPinned: false,
		hasReadme: true,
		owner: "enterprise",
		repo: "rds-aurora-resilience-proxy",
	},
	{
		id: "ses-transactional-notification-gateway",
		name: "ses-transactional-notification-gateway",
		description:
			"High-deliverability transactional email and alert dispatcher via AWS SES with SNS webhook feedback loop for real-time bounce, complaint, and delivery tracking.",
		category: "work",
		htmlUrl: "https://github.com/vitor-pires_tecnosul",
		stars: 0,
		forks: 0,
		language: "TypeScript",
		topics: [
			"aws-ses",
			"aws-sns",
			"aws-sqs",
			"notifications",
			"email-infrastructure",
		],
		isPinned: false,
		hasReadme: true,
		owner: "enterprise",
		repo: "ses-notification-gateway",
	},
	{
		id: "cloudwatch-anomaly-observability-mesh",
		name: "cloudwatch-anomaly-observability-mesh",
		description:
			"Unified telemetry collector aggregating distributed logs, custom CloudWatch EMF metrics, Composite Alarms, and automated SNS pager alerts across AWS microservices.",
		category: "work",
		htmlUrl: "https://github.com/vitor-pires_tecnosul",
		stars: 0,
		forks: 0,
		language: "Go",
		topics: ["cloudwatch", "aws-sns", "observability", "metrics", "monitoring"],
		isPinned: false,
		hasReadme: true,
		owner: "enterprise",
		repo: "cloudwatch-observability-mesh",
	},
	{
		id: "s3-event-driven-media-transcoder",
		name: "s3-event-driven-media-transcoder",
		description:
			"Automated media processing pipeline triggered by S3 ObjectCreated events via SNS/SQS, processing high-resolution assets and storing derived artifacts.",
		category: "work",
		htmlUrl: "https://github.com/vitor-pires_tecnosul",
		stars: 0,
		forks: 0,
		language: "TypeScript",
		topics: ["aws-s3", "aws-sns", "aws-sqs", "serverless", "transcoding"],
		isPinned: false,
		hasReadme: true,
		owner: "enterprise",
		repo: "s3-media-transcoder",
	},
];

export const HISTORICAL_WORK_CONTRIBUTIONS: Readonly<Record<string, number>> = {
	"2025-11-04": 1,
	"2025-11-06": 1,
	"2025-11-07": 1,
	"2025-11-11": 2,
	"2025-11-19": 1,
	"2025-11-24": 1,
	"2025-11-27": 1,
	"2025-11-28": 1,
	"2025-12-08": 1,
	"2025-12-10": 1,
	"2026-01-12": 1,
	"2026-01-22": 2,
	"2026-01-26": 1,
	"2026-02-04": 1,
	"2026-02-05": 1,
	"2026-02-06": 2,
	"2026-02-11": 2,
	"2026-02-12": 1,
	"2026-02-20": 1,
	"2026-02-23": 2,
	"2026-03-11": 1,
	"2026-03-23": 1,
	"2026-03-25": 2,
	"2026-03-30": 3,
	"2026-04-06": 2,
	"2026-04-10": 1,
	"2026-04-13": 1,
	"2026-04-14": 1,
	"2026-04-15": 3,
	"2026-04-20": 1,
	"2026-04-22": 1,
	"2026-04-23": 4,
	"2026-04-27": 2,
	"2026-04-29": 3,
	"2026-04-30": 1,
	"2026-05-05": 4,
	"2026-05-06": 3,
	"2026-05-07": 1,
	"2026-05-11": 1,
	"2026-05-12": 3,
	"2026-05-14": 6,
	"2026-05-15": 5,
	"2026-05-18": 1,
	"2026-05-19": 5,
	"2026-05-20": 6,
	"2026-05-21": 4,
	"2026-05-22": 4,
	"2026-05-25": 2,
	"2026-05-26": 8,
	"2026-05-27": 5,
	"2026-05-28": 5,
	"2026-05-29": 10,
	"2026-06-01": 2,
	"2026-06-02": 3,
	"2026-06-03": 10,
	"2026-06-04": 2,
	"2026-06-05": 11,
	"2026-06-08": 1,
	"2026-06-09": 10,
	"2026-06-10": 1,
	"2026-06-12": 10,
	"2026-06-15": 5,
	"2026-06-16": 8,
	"2026-06-18": 1,
	"2026-06-19": 2,
	"2026-06-22": 6,
	"2026-06-23": 3,
	"2026-06-25": 15,
	"2026-06-26": 6,
	"2026-06-27": 1,
	"2026-06-30": 14,
	"2026-07-01": 21,
	"2026-07-02": 9,
	"2026-07-03": 7,
	"2026-07-06": 8,
	"2026-07-07": 7,
	"2026-07-09": 15,
	"2026-07-10": 7,
	"2026-07-13": 2,
};

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

		// Check verified historical enterprise contributions first
		const historicalCount = HISTORICAL_WORK_CONTRIBUTIONS[dateStr];
		if (historicalCount !== undefined) {
			totalWork += historicalCount;
			days.push({
				date: dateStr,
				count: historicalCount,
				category: historicalCount > 0 ? "work" : "none",
			});
			continue;
		}

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
	"enterprise/event-mesh-sqs-sns": `# Enterprise Event Mesh (AWS SNS + SQS)

Decoupled, event-driven pub/sub distribution mesh built with Amazon SNS and Amazon SQS.

## Architectural Problem Solved
Synchronously coupled microservices suffer from cascading latency, retry storms, and downtime under peak loads. This architecture provides guaranteed asynchronous message delivery, service isolation, and automated poisoned-message handling.

## Architecture & Data Flow
1. **Event Producers**: Dispatch structured JSON domain events to an **Amazon SNS Topic**.
2. **Topic Fanout**: Amazon SNS replicates messages concurrently to isolated subscriber **Amazon SQS Queues** using filter policies.
3. **Dead-Letter Queues (DLQ)**: Failed worker executions automatically transfer messages to a Dead-Letter Queue after 5 failed attempts (Exponential Backoff + Jitter).
4. **CloudWatch Monitoring**: Triggers alarms when \`ApproximateNumberOfMessagesVisible\` in DLQ exceeds 0 or when queue processing latency spikes.

## Key Capabilities
- **SNS Message Filtering**: Consumer queues only receive events matching their attribute filter policies (e.g. \`event_type: "ORDER_COMPLETED"\`).
- **At-Least-Once Delivery**: Strict idempotency keys stored in Redis ensure duplicate deliveries are safely ignored.
- **Auto-Recovery Redrive**: Automated scriptable redrive tasks replay DLQ items back to main queue once root cause is remediated.
`,
	"enterprise/kinesis-telemetry-pipeline": `# High-Throughput Real-Time Telemetry Pipeline (AWS Kinesis)

Real-time streaming ingestion engine processing 50,000+ telemetry events/second using AWS Kinesis Data Streams.

## Architectural Problem Solved
Batch ETL approaches cannot deliver immediate operational insights. This streaming architecture ingests, partitions, and aggregates flight and device telemetry in real-time with sub-second latencies.

## Architecture & Components
- **Kinesis Data Streams**: Dynamic shard allocation auto-scaling based on incoming bytes throughput.
- **Enhanced Fan-Out (EFO)**: Dedicated 2MB/sec read throughput per shard for consumer worker pools.
- **Batch Parquet Sink to S3**: Kinesis Firehose micro-batches stream records into Snappy-compressed Apache Parquet format on Amazon S3.
- **CloudWatch Real-Time Alarms**: Monitored via \`GetRecords.IteratorAgeMilliseconds\` to prevent consumer lag from building up.
`,
	"enterprise/s3-glacier-compliance-vault": `# Secure Compliance Document Vault (AWS S3 & Glacier)

Tamper-evident, zero-trust document storage vault with automated lifecycle tiering.

## Architectural Problem Solved
Storing millions of compliance records and attachments in standard storage is cost-prohibitive, and ensuring regulatory immutability (WORM) requires strict cryptographic guarantees.

## Solution Architecture
- **Presigned Multipart Uploads**: Direct client-to-S3 uploads with sub-100ms URL generation, bypassing backend server bandwidth bottlenecks.
- **KMS Envelope Encryption**: All objects encrypted at rest using dedicated AWS KMS Customer Managed Keys (CMK) with automated key rotation.
- **Lifecycle Tiering Rules**: Objects automatically transition from S3 Standard -> S3 Infrequent Access (30 days) -> S3 Glacier Flexible Retrieval (90 days).
- **S3 Object Lock**: Legal hold and compliance retention modes prevent deletion or modification throughout mandatory regulatory audit windows.
`,
	"enterprise/nestjs-fleet-telemetry-gateway": `# Enterprise Fleet Telemetry Gateway (NestJS & AWS)

High-performance IoT telemetry ingestion and fleet operations gateway built with NestJS, TypeScript, and AWS EventBridge.

## Architectural Problem Solved
Managing high-velocity drone and IoT device telemetry concurrently with enterprise administrative operations requires strict decoupling of fast-path telemetry streams from transactional domain flows, alongside rigorous multi-tenant role/attribute-based authorization.

## Architecture & Components
- **ABAC/RBAC Policy Kernel**: Dynamic CASL and CTE-backed scope resolution for dealership hierarchies, technicians, and customer accounts.
- **AWS EventBridge & SQS**: Publishes asynchronous domain events (device activations, warranty claims, maintenance alerts) into decoupled worker queues.
- **Valkey / Redis In-Memory Cache**: High-throughput distributed caching of drone configurations, geofencing rules, and recent telemetry traces.
- **TimescaleDB Partitioning**: Hypertable telemetry persistence for mission time-series analysis and spatial flight tracking.
- **OpenAPI & Scalar Documentation**: Real-time contract-first API schemas served via OpenAPI and interactive Scalar UI.
`,
	"enterprise/dotnet-iot-telemetry-engine": `# High-Throughput IoT Telemetry Ingestion Engine (.NET 9 & AWS)

High-throughput distributed ingestion and command processing engine engineered on .NET 9 and ASP.NET Core.

## Architectural Problem Solved
Streaming high-volume IoT device payloads directly to databases degrades ingestion throughput. This architecture processes high-throughput telemetry streams using non-blocking asynchronous pipelines, Vertical Slice isolation, and load-tested resilience.

## Architecture & Components
- **Vertical Slice Architecture (Sliced Arch)**: Endpoints, commands, queries, and validators encapsulated per feature slice rather than traditional layer soup.
- **AWS IoT Core & Kinesis Streaming**: High-throughput message ingestion with partitioned shard processing and Snappy compression.
- **CQRS & MediatR Pipeline**: Distinct read and write paths with validation behaviors, circuit breakers, and distributed tracing.
- **Distributed Caching with Redis**: Hot-state device cache with optimistic concurrency locks preventing split-brain telemetry state.
- **NBomber & xUnit Resilience**: Automated load stress test suites verifying sub-15ms p99 response times under peak ingestion traffic.
`,
	"enterprise/rds-aurora-resilience-proxy": `# Enterprise Multi-Tenant RDS Aurora Proxy

Connection pool manager and tenant router with AWS RDS Aurora PostgreSQL.

## Architectural Problem Solved
High concurrency workloads can exhaust PostgreSQL connection limits, causing connection starvation and unpredictable query response times.

## Solution Architecture
- **RDS Aurora Read Replicas**: Distributes read-heavy traffic across up to 15 Aurora replicas with auto-scaling replica pools.
- **PgBouncer Connection Pooling**: Keeps connection overhead sub-millisecond and prevents connection thrashing.
- **Tenant Schema Isolation**: Dynamic schema routing per customer tenant ensuring complete multi-tenant SOC2 data boundaries.
- **CloudWatch Health Automation**: Monitors replica lag (\`AuroraReplicaLag\`) and disk IOPS, triggering automatic failover if the primary node degrades.
`,
	"enterprise/ses-notification-gateway": `# Transactional Email & Notification Gateway (AWS SES)

High-deliverability transactional messaging gateway with real-time feedback loops.

## Architectural Problem Solved
Email deliverability can be jeopardized by bounced addresses, spam complaints, and ISP throttling, resulting in critical transactional messages failing silently.

## Solution Architecture
- **AWS SES Configuration Sets**: Dedicated IP pools for transactional vs. marketing communications to protect sender reputation.
- **SNS Webhook Feedback Loop**: SES publishes bounce, complaint, and delivery events directly to an **Amazon SNS Topic**.
- **Automated Suppression List**: SQS consumer processes SNS bounce notifications, updating suppression records in PostgreSQL in real-time.
- **CloudWatch Reputation Metrics**: Composite alarms on \`Reputation.BounceRate\` (> 2.5%) and \`Reputation.ComplaintRate\` (> 0.05%) alert DevOps before ISP penalties occur.
`,
	"enterprise/cloudwatch-observability-mesh": `# Unified Observability & Telemetry Mesh (AWS CloudWatch)

Unified observability architecture aggregating metrics, distributed traces, and automated alarms.

## Architectural Problem Solved
Disparate logs and metrics across dozens of serverless and containerized services make incident detection slow and root cause analysis painful.

## Solution Architecture
- **Embedded Metric Format (EMF)**: Emits structured JSON logs containing custom business metrics directly to CloudWatch without requiring extra API calls.
- **Composite Alarms**: Groups multiple metric alarms (e.g., High Latency AND Elevated Error Rate) to reduce notification fatigue and avoid false alarms.
- **SNS Incident Escalation**: Dispatches critical alerts to on-call engineers with deep links to CloudWatch Log Insights queries.
`,
	"enterprise/s3-media-transcoder": `# Event-Driven Media Transcoding Pipeline (AWS S3, SNS, SQS)

Asynchronous asset processing pipeline triggered automatically on media ingestion.

## Architectural Problem Solved
Processing large media files synchronously during user uploads creates timeouts and starves application HTTP threads.

## Solution Architecture
- **S3 ObjectCreated Event**: Bucket event notifications publish to an **Amazon SNS Topic** when new raw assets land in the ingress bucket.
- **SQS Queue Fanout**: Worker queues ingest notifications and scale containerized workers proportionally to queue length.
- **Derived Asset Storage**: Processed, compressed, and web-optimized assets are uploaded to a public egress bucket with CloudFront CDN distribution.
`,
};
