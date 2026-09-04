import { Server } from "lucide-react";
import { MigrationMetricsCard } from "./MigrationMetricsCard";
import { MigrationTimeline } from "./MigrationTimeline";

export function MigrationSection() {
	return (
		<section
			id="migration"
			className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20"
		>
			<div className="space-y-12 border-l-2 border-zinc-800 pl-6">
				<div className="space-y-4">
					<div className="flex items-center space-x-2 text-zinc-500 font-mono text-sm">
						<Server className="h-4 w-4" />
						<span>04. MIGRATION JOURNEY</span>
					</div>
					<h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
						Portfolio v2 Architecture
					</h2>
					<p className="text-zinc-400 max-w-3xl leading-relaxed font-mono text-sm sm:text-base">
						A technical log of modernizing from a legacy 2022 Create React App
						setup to Next.js 16 App Router, Turbopack, TypeScript 7, Biome, and
						an optimized 60fps HTML5 binary matrix canvas.
					</p>
				</div>

				<div className="space-y-4">
					<div className="text-xs font-mono text-zinc-500 font-semibold tracking-wider">
						[ ARCHITECTURAL BENCHMARKS & METRICS ]
					</div>
					<MigrationMetricsCard />
				</div>

				<div className="space-y-6 pt-4">
					<div className="text-xs font-mono text-zinc-500 font-semibold tracking-wider">
						[ MIGRATION TIMELINE & ENGINEERING MILESTONES ]
					</div>
					<MigrationTimeline />
				</div>
			</div>
		</section>
	);
}
