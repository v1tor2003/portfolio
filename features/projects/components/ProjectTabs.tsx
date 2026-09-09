"use client";

import { motion } from "framer-motion";
import type { ProjectCategory } from "../schemas/project.schema";

interface ProjectTabsProps {
	activeTab: ProjectCategory;
	onTabChange: (tab: ProjectCategory) => void;
}

const MotionDiv = motion.div as React.ComponentType<{
	layoutId?: string;
	className?: string;
	transition?: Record<string, unknown>;
	children?: React.ReactNode;
}>;

const TABS: { id: ProjectCategory; label: string }[] = [
	{ id: "personal", label: "// 01. PERSONAL" },
	{ id: "work", label: "// 02. WORK (ENTERPRISE CONTRIBUTIONS)" },
];

export function ProjectTabs({ activeTab, onTabChange }: ProjectTabsProps) {
	return (
		<div className="flex flex-wrap items-center gap-2 p-1.5 bg-black/40 border border-zinc-800 rounded-lg font-mono">
			{TABS.map((tab) => {
				const isActive = activeTab === tab.id;
				const isPersonal = tab.id === "personal";

				return (
					<button
						key={tab.id}
						type="button"
						onClick={() => onTabChange(tab.id)}
						className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors z-10 ${
							isActive
								? isPersonal
									? "text-emerald-400 font-semibold"
									: "text-purple-400 font-semibold"
								: "text-zinc-400 hover:text-zinc-200"
						}`}
					>
						{isActive && (
							<MotionDiv
								layoutId="active-project-tab"
								className={`absolute inset-0 rounded-md border ${
									isPersonal
										? "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
										: "bg-purple-500/10 border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
								}`}
								transition={{ type: "spring", stiffness: 350, damping: 30 }}
							/>
						)}
						<span className="relative z-10">{tab.label}</span>
					</button>
				);
			})}
		</div>
	);
}
