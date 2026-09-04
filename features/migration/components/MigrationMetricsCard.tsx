import {
	type MetricHighlight,
	MIGRATION_METRICS,
} from "../data/migration-steps";

interface MigrationMetricsCardProps {
	metrics?: MetricHighlight[];
}

export function MigrationMetricsCard({
	metrics = MIGRATION_METRICS,
}: MigrationMetricsCardProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			{metrics.map((metric) => (
				<div
					key={metric.label}
					className="flex flex-col justify-between rounded-lg border border-zinc-800/80 bg-zinc-950/70 p-4 font-mono transition-colors hover:border-zinc-700"
				>
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<span className="text-xs text-zinc-400 font-semibold tracking-wider">
								{metric.label}
							</span>
							<span className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[10px] text-zinc-300">
								{metric.improvement}
							</span>
						</div>

						<div className="pt-2">
							<div className="text-xs text-zinc-400 line-through">
								{metric.before}
							</div>
							<div className="text-xl font-bold text-white tracking-tight">
								{metric.after}
							</div>
						</div>
					</div>

					<p className="pt-4 text-xs text-zinc-400 leading-relaxed">
						{metric.description}
					</p>
				</div>
			))}
		</div>
	);
}
