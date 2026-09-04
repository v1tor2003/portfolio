import { Tag } from "lucide-react";
import { MIGRATION_PHASES, type MigrationPhase } from "../data/migration-steps";

interface MigrationTimelineProps {
	phases?: MigrationPhase[];
}

export function MigrationTimeline({
	phases = MIGRATION_PHASES,
}: MigrationTimelineProps) {
	return (
		<div className="relative border-l border-zinc-800 ml-4 sm:ml-6 space-y-12">
			{phases.map((phase) => (
				<div
					key={phase.id}
					className="relative pl-6 sm:pl-8 group"
					data-testid={`timeline-phase-${phase.id}`}
				>
					{/* Timeline node */}
					<div className="absolute -left-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black border border-zinc-700 group-hover:border-white transition-colors">
						<div className="h-1.5 w-1.5 rounded-full bg-zinc-500 group-hover:bg-white transition-colors" />
					</div>

					<div className="space-y-3 rounded-lg border border-zinc-900 bg-zinc-950/40 p-5 font-mono backdrop-blur-xs transition-colors hover:border-zinc-800">
						<div className="flex flex-wrap items-center justify-between gap-2">
							<div className="flex items-center space-x-2">
								<span className="text-xs font-semibold text-zinc-500">
									[{phase.phaseNumber}]
								</span>
								<h3 className="text-base sm:text-lg font-bold text-white">
									{phase.title}
								</h3>
							</div>

							{phase.diffMetrics && (
								<div className="flex items-center space-x-2 text-xs">
									{phase.diffMetrics.highlight && (
										<span className="rounded border border-zinc-800 bg-zinc-900/80 px-2 py-0.5 text-zinc-300">
											{phase.diffMetrics.highlight}
										</span>
									)}
								</div>
							)}
						</div>

						<p className="text-sm text-zinc-400 leading-relaxed">
							{phase.summary}
						</p>

						<div className="space-y-1.5 pt-2">
							<div className="text-xs font-semibold text-zinc-500">
								KEY_DECISIONS:
							</div>
							<ul className="space-y-1 text-xs text-zinc-400">
								{phase.architecturePoints.map((point) => (
									<li key={point} className="flex items-start space-x-2">
										<span className="text-zinc-600 select-none">▸</span>
										<span>{point}</span>
									</li>
								))}
							</ul>
						</div>

						<div className="flex flex-wrap items-center gap-1.5 pt-3">
							{phase.tags.map((tag) => (
								<span
									key={tag}
									className="inline-flex items-center space-x-1 rounded bg-zinc-900 px-2 py-0.5 text-[11px] text-zinc-400 border border-zinc-800/60"
								>
									<Tag className="h-3 w-3 text-zinc-600" />
									<span>{tag}</span>
								</span>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
