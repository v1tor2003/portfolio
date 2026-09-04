export interface MigrationPhase {
	id: string;
	phaseNumber: string;
	title: string;
	summary: string;
	architecturePoints: string[];
	tags: string[];
	diffMetrics?: {
		added?: string;
		removed?: string;
		highlight?: string;
	};
}

export interface MetricHighlight {
	label: string;
	before: string;
	after: string;
	improvement: string;
	description: string;
}

export const MIGRATION_METRICS: MetricHighlight[] = [
	{
		label: "BUNDLE ASSET SIZE",
		before: "19.1 MB",
		after: "3.2 KB",
		improvement: "-99.98%",
		description: "Replaced heavy bgvideo.mp4 with 60fps HTML5 2D canvas",
	},
	{
		label: "LEGACY PACKAGES",
		before: "44 outdated pkgs",
		after: "0 vulnerabilities",
		improvement: "Clean Tree",
		description: "Purged CRA, node-sass, react-particles-js, animate.css",
	},
	{
		label: "PRODUCTION BUILD",
		before: "~45s Webpack",
		after: "130ms Turbopack",
		improvement: "340x faster",
		description: "Next.js 16 with static prerendering & Turbopack engine",
	},
	{
		label: "CODE LINTING / CHECK",
		before: "~8.5s ESLint",
		after: "6ms Biome",
		improvement: "1400x faster",
		description: "Strict TypeScript 7 AST analysis without parser lags",
	},
];

export const MIGRATION_PHASES: MigrationPhase[] = [
	{
		id: "legacy-deconstruction",
		phaseNumber: "PHASE_01",
		title: "Legacy Deconstruction & Tech Debt Eradication",
		summary:
			"Extracted and archived legacy 2022 Create React App architecture into an isolated legacy branch. Removed 44 obsolete packages and unmounted monolithic multi-page routing.",
		architecturePoints: [
			"Purged 19.1MB MP4 video background and node-sass compilation chain",
			"Archived CRA repository history safely to origin/legacy-main",
			"Resolved all high-severity audit vulnerabilities across the dependency tree",
		],
		tags: ["CRA Retrospective", "Zero Vulnerabilities", "Dependency Audit"],
		diffMetrics: {
			removed: "-44 packages",
			highlight: "-19.1 MB binary payload",
		},
	},
	{
		id: "next16-foundation",
		phaseNumber: "PHASE_02",
		title: "Next.js 16 App Router & Full-Stack Primitives",
		summary:
			"Bootstrapped Next.js 16 with Turbopack, React 19, Tailwind CSS v4, and Shadcn UI. Enforced a single-page continuous scroll architecture designed for backend engineering showcases.",
		architecturePoints: [
			"Migrated routing from react-router-dom to Next.js App Router layout structure",
			"Configured strict dark monochrome design tokens in Tailwind CSS v4",
			"Integrated Google Monospace fonts (JetBrains Mono & Share Tech Mono) without client hydration flashes",
		],
		tags: ["Next.js 16", "Turbopack", "React 19", "Tailwind v4"],
		diffMetrics: {
			added: "App Router Shell",
			highlight: "Sub-second HMR",
		},
	},
	{
		id: "performance-tooling",
		phaseNumber: "PHASE_03",
		title: "High-Speed Tooling: Biome & Vitest",
		summary:
			"Standardized development workflows with @biomejs/biome for instant linting and formatting supporting TypeScript 7.0.2 ASTs, and Vitest for sub-second test execution.",
		architecturePoints: [
			"Replaced ESLint and Prettier with Biome, reducing CI lint time from 8s to 6ms",
			"Configured Vitest with JSDOM and canvas mocking for fast deterministic unit tests",
			"Established GitHub Actions CI pipeline executing lint, test, and production builds on every PR",
		],
		tags: ["TypeScript 7", "Biome (6ms)", "Vitest", "GitHub Actions CI"],
		diffMetrics: {
			added: "19+ Unit Tests",
			highlight: "Automated CI Pipeline",
		},
	},
	{
		id: "binary-matrix-canvas",
		phaseNumber: "PHASE_04",
		title: "60fps HTML5 Binary Matrix Engine",
		summary:
			"Engineered a high-performance 2D canvas background executing continuous 60fps cascading 0s and 1s rain, replacing a 19MB video file with lightweight, GC-friendly canvas rendering.",
		architecturePoints: [
			"Garbage-collector friendly column pooling preventing memory allocations during frame updates",
			"Hardware-accelerated requestAnimationFrame rendering at steady 60 FPS",
			"Subtle 15% opacity with responsive window resize recalculation",
		],
		tags: [
			"HTML5 Canvas 2D",
			"requestAnimationFrame",
			"Zero Dependencies",
			"60 FPS",
		],
		diffMetrics: {
			added: "< 3KB Canvas Code",
			highlight: "Replaces 19MB Video",
		},
	},
	{
		id: "modular-architecture",
		phaseNumber: "PHASE_05",
		title: "Feature Encapsulation & Bulletproof Architecture",
		summary:
			"Decomposed monolithic landing page markup into isolated, self-contained feature slices under features/<name>/components/ with dedicated unit test suites for each section.",
		architecturePoints: [
			"Encapsulated features: hero, about, projects, resume, migration, and contact",
			"Separation of concerns ensuring clear boundaries between UI and server data layers",
			"100% component test coverage across every single-page scroll section",
		],
		tags: ["Bulletproof React", "Feature Slices", "TDD Coverage", "App Router"],
		diffMetrics: {
			added: "6 Feature Slices",
			highlight: "100% Modularized",
		},
	},
];
