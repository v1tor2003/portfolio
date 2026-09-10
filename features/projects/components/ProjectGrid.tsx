"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { Project } from "../schemas/project.schema";
import { ProjectCard } from "./ProjectCard";
import { ProjectPagination } from "./ProjectPagination";

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

const ITEMS_PER_PAGE = 9;

export function ProjectGrid({ projects, onViewReadme }: ProjectGridProps) {
	const [currentPage, setCurrentPage] = useState(1);

	// Reset to page 1 whenever projects change (e.g. tab switch or filter update)
	useEffect(() => {
		setCurrentPage(1);
	}, [projects]);

	const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

	const paginatedProjects = useMemo(() => {
		const start = (currentPage - 1) * ITEMS_PER_PAGE;
		return projects.slice(start, start + ITEMS_PER_PAGE);
	}, [projects, currentPage]);

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
		<div className="space-y-6">
			<MotionDiv
				layout
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
			>
				{paginatedProjects.map((project, idx) => (
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

			<ProjectPagination
				currentPage={currentPage}
				totalPages={totalPages}
				totalItems={projects.length}
				itemsPerPage={ITEMS_PER_PAGE}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
}
