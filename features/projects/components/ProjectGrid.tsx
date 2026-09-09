"use client";

import { motion } from "framer-motion";
import type { Project } from "../schemas/project.schema";
import { ProjectCard } from "./ProjectCard";

const MotionDiv = motion.div as React.ComponentType<{
	layout?: boolean;
	initial?: Record<string, unknown>;
	animate?: Record<string, unknown>;
	transition?: Record<string, unknown>;
	className?: string;
	children?: React.ReactNode;
}>;

interface ProjectGridProps {
	projects: Project[];
	onViewReadme: (project: Project) => void;
}

export function ProjectGrid({ projects, onViewReadme }: ProjectGridProps) {
	if (projects.length === 0) {
		return (
			<div className="py-16 text-center border border-dashed border-zinc-800 rounded-lg p-8 font-mono">
				<p className="text-zinc-500 text-sm">
					{"// NO REPOSITORIES FOUND IN THIS CATEGORY"}
				</p>
			</div>
		);
	}

	return (
		<MotionDiv
			layout
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
		>
			{projects.map((project, idx) => (
				<MotionDiv
					key={project.id}
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.25, delay: idx * 0.05 }}
				>
					<ProjectCard project={project} onViewReadme={onViewReadme} />
				</MotionDiv>
			))}
		</MotionDiv>
	);
}
