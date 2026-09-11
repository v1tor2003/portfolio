import { Terminal } from "lucide-react";
import { SKILL_GROUPS, type SkillGroup } from "../data/about-data";
import { SkillBadge } from "./SkillBadge";

interface TechStackGridProps {
	groups?: readonly SkillGroup[];
}

export function TechStackGrid({ groups = SKILL_GROUPS }: TechStackGridProps) {
	return (
		<div className="space-y-6 font-mono">
			<div className="flex items-center space-x-2 text-zinc-400 text-sm">
				<Terminal className="h-4 w-4 text-white" />
				<span>TECHNICAL STACK & ARCHITECTURAL ECOSYSTEM</span>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{groups.map((group) => (
					<div
						key={group.title}
						className="rounded-lg border border-zinc-800 bg-black p-5 space-y-4 shadow-lg transition-all duration-200 hover:border-zinc-700"
					>
						<h4 className="font-mono text-xs font-semibold text-zinc-300">
							{group.title}
						</h4>
						<div className="flex flex-wrap gap-2">
							{group.skills.map((skill) => (
								<SkillBadge key={skill} name={skill} />
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
