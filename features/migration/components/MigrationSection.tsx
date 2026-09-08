import { MigrationHeader } from "./MigrationHeader";
import { MigrationMetricsCard } from "./MigrationMetricsCard";
import { MigrationTimeline } from "./MigrationTimeline";

export function MigrationSection() {
	return (
		<section
			id="migration"
			className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20"
		>
			<div className="space-y-12 border-l-2 border-zinc-800 pl-6">
				<MigrationHeader />

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
