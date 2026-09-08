import { CORE_HIGHLIGHTS, type HighlightItem } from "../data/about-data";

interface CoreHighlightsProps {
	highlights?: readonly HighlightItem[];
}

export function CoreHighlights({
	highlights = CORE_HIGHLIGHTS,
}: CoreHighlightsProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
			{highlights.map((item) => {
				const Icon = item.icon;
				return (
					<div
						key={item.title}
						className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-6 space-y-3 backdrop-blur-sm"
					>
						<div className="flex items-center space-x-3 text-white">
							<Icon className="h-5 w-5 text-zinc-400" />
							<h3 className="font-semibold text-base">{item.title}</h3>
						</div>
						<p className="text-xs text-zinc-400 leading-relaxed">
							{item.description}
						</p>
					</div>
				);
			})}
		</div>
	);
}
