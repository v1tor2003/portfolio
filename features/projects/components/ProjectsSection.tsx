"use client";

import { ExternalLink, GitBranch } from "lucide-react";
import { useMemo, useState } from "react";
import { GithubIcon } from "@/components/ui/icons";
import type {
	GitActivityData,
	Project,
	ProjectCategory,
} from "../schemas/project.schema";
import {
	generateGitActivityData,
	SEED_PERSONAL_PROJECTS,
	SEED_WORK_PROJECTS,
} from "../server/projects-seed.data";
import { GitActivityGraph } from "./GitActivityGraph";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectReadmeModal } from "./ProjectReadmeModal";
import { ProjectTabs } from "./ProjectTabs";

interface ProjectsSectionProps {
	initialProjects?: Project[];
	initialActivity?: GitActivityData;
}

const DEFAULT_PROJECTS = [...SEED_PERSONAL_PROJECTS, ...SEED_WORK_PROJECTS];

export function ProjectsSection({
	initialProjects = DEFAULT_PROJECTS,
	initialActivity,
}: ProjectsSectionProps) {
	const [activeCategory, setActiveCategory] =
		useState<ProjectCategory>("personal");
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);

	const activityData = useMemo(() => {
		return initialActivity ?? generateGitActivityData(52);
	}, [initialActivity]);

	const filteredProjects = useMemo(() => {
		return initialProjects.filter((p) => p.category === activeCategory);
	}, [initialProjects, activeCategory]);

	return (
		<section
			id="projects"
			className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20 space-y-8"
		>
			{/* Section Header */}
			<div className="space-y-4 border-l-2 border-zinc-800 pl-6">
				<div className="flex items-center space-x-2 text-zinc-500 font-mono text-sm">
					<GitBranch className="h-4 w-4" />
					<span>02. FEATURED PROJECTS</span>
				</div>
				<h2 className="text-3xl sm:text-4xl font-bold text-white font-mono flex flex-wrap items-center gap-3">
					<span>Featured Github Repositories</span>
					<a
						href="https://github.com/v1tor2003"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub Profile"
						className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-blue-400 border-b-2 border-transparent hover:border-blue-400 pb-0.5 transition-all group"
					>
						<GithubIcon
							size={26}
							className="text-zinc-400 group-hover:text-blue-400 transition-colors"
						/>
						<ExternalLink className="h-5 w-5 text-zinc-400 group-hover:text-blue-400 transition-colors" />
					</a>
				</h2>
				<p className="text-zinc-400 max-w-3xl leading-relaxed font-mono">
					A showcase of open-source libraries and learning projects, as well as
					enterprise backend services visualized through custom Git activity
					graphs.
				</p>
			</div>

			{/* Navigation Tabs (Matrix Switch) */}
			<div className="pt-2">
				<ProjectTabs
					activeTab={activeCategory}
					onTabChange={setActiveCategory}
				/>
			</div>

			{/* Git Contribution Activity Matrix */}
			<GitActivityGraph
				activity={activityData}
				activeCategory={activeCategory}
			/>

			{/* Filtered Project Grid */}
			<ProjectGrid
				projects={filteredProjects}
				onViewReadme={(p) => setSelectedProject(p)}
				category={activeCategory}
			/>

			{/* On-demand README Modal */}
			<ProjectReadmeModal
				isOpen={Boolean(selectedProject)}
				onClose={() => setSelectedProject(null)}
				owner={selectedProject?.owner ?? "v1tor2003"}
				repo={selectedProject?.repo ?? ""}
				title={selectedProject?.name}
			/>
		</section>
	);
}
