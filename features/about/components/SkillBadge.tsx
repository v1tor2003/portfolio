export interface SkillBadgeProps {
	name: string;
	category?: "backend" | "cloud" | "architecture";
}

export function SkillBadge({ name }: SkillBadgeProps) {
	return (
		<div className="inline-flex items-center space-x-2 rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 font-mono text-xs text-zinc-300 transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white">
			<span className="text-zinc-500 font-bold">&gt;</span>
			<span>{name}</span>
		</div>
	);
}
