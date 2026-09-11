import { CORE_HIGHLIGHTS, type HighlightItem } from "../data/about-data";

interface CoreHighlightsProps {
	highlights?: readonly HighlightItem[];
}

export function CoreHighlights({
	highlights = CORE_HIGHLIGHTS,
}: CoreHighlightsProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
			{highlights.map((item) => {
				const Icon = item.icon;
				return (
					<div
						key={item.title}
						className="rounded-lg border border-zinc-800 bg-black p-6 space-y-4 transition-all duration-200 hover:border-zinc-600 flex flex-col justify-between shadow-lg"
					>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="h-10 w-10 rounded border border-zinc-800 bg-black flex items-center justify-center text-white shrink-0">
									<Icon className="h-5 w-5 text-white" />
								</div>
								{item.badge && (
									<span className="text-[10px] tracking-wider text-zinc-400 bg-black border border-zinc-800 px-2 py-0.5 rounded uppercase font-semibold">
										{item.badge}
									</span>
								)}
							</div>

							<div className="space-y-2">
								<h3 className="font-bold text-sm sm:text-base text-white tracking-tight">
									{item.title}
								</h3>
								<p className="text-xs text-zinc-300 leading-relaxed">
									{item.description}
								</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
