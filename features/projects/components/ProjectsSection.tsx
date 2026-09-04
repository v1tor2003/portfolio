import { GitBranch } from "lucide-react";

export function ProjectsSection() {
	return (
		<section
			id="projects"
			className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20"
		>
			<div className="space-y-4 border-l-2 border-zinc-800 pl-6">
				<div className="flex items-center space-x-2 text-zinc-500 font-mono text-sm">
					<GitBranch className="h-4 w-4" />
					<span>02. FEATURED PROJECTS</span>
				</div>
				<h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
					Backend Open Source & Cloud Work
				</h2>
				<p className="text-zinc-400 max-w-3xl leading-relaxed">
					Explore personal server-side open-source libraries (like
					`@v1tor2003/command-api`) and enterprise backend services, highlighted
					with custom Git activity graphs.
				</p>
			</div>
		</section>
	);
}
