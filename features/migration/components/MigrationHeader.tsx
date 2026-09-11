import { BookOpen } from "lucide-react";

export function MigrationHeader() {
	return (
		<div className="space-y-4">
			<div className="flex items-center space-x-2 text-zinc-500 font-mono text-sm">
				<BookOpen className="h-4 w-4" />
				<span>04. MIGRATION JOURNEY</span>
			</div>
			<h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
				Portfolio v2 Architecture
			</h2>
			<div className="space-y-3 text-zinc-400 max-w-3xl leading-relaxed font-mono text-sm sm:text-base">
				<p>
					The previous portfolio was stuck in a legacy 2022 Create React App
					monolith—burdened by slow Webpack compilation, vulnerable
					dependencies, an unoptimized 19MB video background, and an outdated
					visual presentation that failed to reflect modern backend and cloud
					engineering capabilities.
				</p>
				<p>
					Driven by the motivation to transform that obsolete codebase into a
					mature, high-performance architectural showcase, the entire system was
					rebuilt from the ground up: migrating to Next.js 16 App Router with
					Turbopack, strict TypeScript, Biome tooling, a 60fps lightweight
					canvas engine, and modular feature slices supporting clean
					architecture and enterprise-grade telemetry gateways.
				</p>
			</div>
		</div>
	);
}
