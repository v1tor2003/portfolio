import { GitBranch, Loader2 } from "lucide-react";

export function ProjectsSkeleton() {
	return (
		<div
			role="status"
			aria-label="Loading projects"
			aria-busy="true"
			className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full font-mono space-y-8 animate-pulse"
		>
			{/* Header Skeleton */}
			<div className="space-y-4 border-l-2 border-zinc-800 pl-6">
				<div className="flex items-center space-x-2 text-zinc-500 text-sm">
					<GitBranch className="h-4 w-4 text-zinc-600" />
					<span>02. FEATURED PROJECTS</span>
				</div>
				<div className="h-9 sm:h-10 bg-zinc-800/80 rounded w-3/4 max-w-md" />
				<div className="space-y-2">
					<div className="h-4 bg-zinc-800/50 rounded w-full max-w-2xl" />
					<div className="h-4 bg-zinc-800/50 rounded w-2/3 max-w-xl" />
				</div>
			</div>

			{/* Activity Matrix Skeleton */}
			<div className="w-full bg-black/40 border border-zinc-800 rounded-lg p-4 sm:p-5 space-y-4">
				<div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
					<div className="flex items-center space-x-2">
						<Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-400" />
						<span className="text-xs text-zinc-400">
							{"// SYNCHRONIZING ACTIVITY MATRIX..."}
						</span>
					</div>
					<div className="flex gap-4">
						<div className="h-3 w-28 bg-zinc-800 rounded" />
						<div className="h-3 w-28 bg-zinc-800 rounded" />
					</div>
				</div>

				{/* 52-week columns placeholder */}
				<div className="h-24 bg-zinc-900/60 rounded border border-zinc-800/60 flex items-center justify-center">
					<span className="text-xs text-zinc-600">
						CONNECTING_TO_GITHUB_TELEMETRY...
					</span>
				</div>
			</div>

			{/* Tabs Skeleton */}
			<div className="flex gap-2 p-1.5 bg-black/40 border border-zinc-800 rounded-lg w-fit">
				<div className="h-8 w-32 bg-zinc-800/80 rounded" />
				<div className="h-8 w-60 bg-zinc-800/50 rounded" />
			</div>

			{/* Grid Skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				{[1, 2, 3, 4, 5, 6].map((i) => (
					<div
						key={i}
						className="flex flex-col justify-between bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-5 space-y-6"
					>
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<div className="h-5 w-40 bg-zinc-800 rounded" />
								<div className="h-4 w-16 bg-zinc-800/60 rounded" />
							</div>
							<div className="space-y-1.5">
								<div className="h-3.5 bg-zinc-800/60 rounded w-full" />
								<div className="h-3.5 bg-zinc-800/60 rounded w-4/5" />
								<div className="h-3.5 bg-zinc-800/60 rounded w-3/5" />
							</div>
							<div className="flex gap-2 pt-2">
								<div className="h-4 w-14 bg-zinc-800/40 rounded" />
								<div className="h-4 w-16 bg-zinc-800/40 rounded" />
								<div className="h-4 w-12 bg-zinc-800/40 rounded" />
							</div>
						</div>

						<div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
							<div className="h-3.5 w-20 bg-zinc-800 rounded" />
							<div className="h-6 w-16 bg-zinc-800 rounded" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
