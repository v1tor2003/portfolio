import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getProjectsService, ProjectsSection } from "@/features/projects";

export const metadata: Metadata = {
	title: "Projects | Vítor Pires",
	description:
		"Backend systems, open-source libraries, and cloud architecture projects by Vítor Pires.",
};

export default async function ProjectsPage() {
	const projectsService = getProjectsService();
	const [projects, activity] = await Promise.all([
		projectsService.getProjects(),
		projectsService.getGitActivity(),
	]);

	return (
		<div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto w-full font-mono space-y-8">
			<Link
				href="/"
				aria-label="Back to home"
				className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors"
			>
				<ArrowLeft className="h-4 w-4" />
				<span>BACK TO HOME</span>
			</Link>
			<ProjectsSection initialProjects={projects} initialActivity={activity} />
		</div>
	);
}
