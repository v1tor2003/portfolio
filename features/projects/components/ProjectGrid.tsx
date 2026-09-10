"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Project, ProjectCategory } from "../schemas/project.schema";
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
	category?: ProjectCategory;
	totalItems?: number;
}

const ITEMS_PER_PAGE = 9;

export function ProjectGrid({
	projects,
	onViewReadme,
	category = "personal",
	totalItems,
}: ProjectGridProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageCache, setPageCache] = useState<Record<number, Project[]>>({});
	const [serverTotal, setServerTotal] = useState<number | null>(
		totalItems ?? null,
	);
	const [isLoadingPage, setIsLoadingPage] = useState(false);

	// Reset to page 1 whenever projects or category change
	useEffect(() => {
		setCurrentPage(1);
		setPageCache({});
		setServerTotal(totalItems ?? null);
	}, [category, projects, totalItems]);

	const totalCount = serverTotal ?? projects.length;
	const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1;

	const fetchPageOnDemand = useCallback(
		async (pageToFetch: number) => {
			if (pageCache[pageToFetch]) return;

			// If local projects array already has enough elements for this page, use it directly
			const localSlice = projects.slice(
				(pageToFetch - 1) * ITEMS_PER_PAGE,
				pageToFetch * ITEMS_PER_PAGE,
			);
			if (localSlice.length > 0 && projects.length > ITEMS_PER_PAGE) {
				setPageCache((prev) => ({ ...prev, [pageToFetch]: localSlice }));
				return;
			}

			setIsLoadingPage(true);
			try {
				const res = await fetch(
					`/api/projects?category=${category}&page=${pageToFetch}&limit=${ITEMS_PER_PAGE}`,
				);
				if (res.ok) {
					const data = await res.json();
					if (Array.isArray(data.projects)) {
						setPageCache((prev) => ({
							...prev,
							[pageToFetch]: data.projects,
						}));
						if (typeof data.total === "number") {
							setServerTotal(data.total);
						}
					}
				}
			} catch {
				// Resilient fallback to local projects
			} finally {
				setIsLoadingPage(false);
			}
		},
		[category, pageCache, projects],
	);

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
		fetchPageOnDemand(newPage);
	};

	const currentProjects = useMemo(() => {
		if (pageCache[currentPage]) {
			return pageCache[currentPage];
		}
		const start = (currentPage - 1) * ITEMS_PER_PAGE;
		return projects.slice(start, start + ITEMS_PER_PAGE);
	}, [pageCache, currentPage, projects]);

	if (!isLoadingPage && currentProjects.length === 0) {
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
			{isLoadingPage ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
					{Array.from({ length: Math.min(ITEMS_PER_PAGE, 6) }).map((_, i) => (
						<div
							key={`skeleton-${i}`}
							className="h-[280px] bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-5"
						/>
					))}
				</div>
			) : (
				<MotionDiv
					layout
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
				>
					{currentProjects.map((project, idx) => (
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
			)}

			<ProjectPagination
				currentPage={currentPage}
				totalPages={totalPages}
				totalItems={totalCount}
				itemsPerPage={ITEMS_PER_PAGE}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}
