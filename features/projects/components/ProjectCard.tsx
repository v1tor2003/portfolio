"use client";

import {
	ExternalLink,
	FileText,
	FolderGit2,
	GitFork,
	Pin,
	Star,
} from "lucide-react";
import type { Project } from "../schemas/project.schema";

interface ProjectCardProps {
	project: Project;
	onViewReadme: (project: Project) => void;
}

const LANGUAGE_COLORS: Record<string, string> = {
	TypeScript: "bg-blue-400",
	JavaScript: "bg-yellow-400",
	Go: "bg-cyan-400",
	"C#": "bg-purple-400",
	Python: "bg-emerald-400",
	Rust: "bg-orange-400",
	Markdown: "bg-zinc-400",
};

export function ProjectCard({ project, onViewReadme }: ProjectCardProps) {
	const langColor = LANGUAGE_COLORS[project.language] || "bg-emerald-400";
	const isPersonal = project.category === "personal";

	return (
		// biome-ignore lint/a11y/useSemanticElements: Card container cannot be a native <button> because it contains nested external links
		<div
			role="button"
			tabIndex={0}
			aria-label={`View details and README for ${project.name}`}
			onClick={() => onViewReadme(project)}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onViewReadme(project);
				}
			}}
			className={`group h-[280px] w-full flex flex-col justify-between bg-zinc-950/70 border border-zinc-800/80 rounded-lg p-5 font-mono cursor-pointer transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/40 hover:shadow-lg hover:shadow-black/40 focus:outline-none focus:ring-1 ${
				isPersonal
					? "focus:ring-emerald-500/50 hover:border-emerald-500/30"
					: "focus:ring-purple-500/50 hover:border-purple-500/30"
			}`}
		>
			{/* Header and Details */}
			<div className="space-y-3">
				<div className="flex items-start justify-between gap-2">
					<div className="flex items-center space-x-2 text-zinc-400 truncate">
						<FolderGit2
							className={`h-4 w-4 shrink-0 transition-colors ${
								isPersonal
									? "group-hover:text-emerald-400"
									: "group-hover:text-purple-400"
							}`}
						/>
						<a
							href={project.htmlUrl}
							target="_blank"
							rel="noopener noreferrer"
							onClick={(e) => e.stopPropagation()}
							className="text-sm sm:text-base font-bold text-white hover:underline truncate"
						>
							{project.name}
						</a>
					</div>

					{project.isPinned && (
						<span className="flex items-center gap-1 text-[10px] tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded uppercase shrink-0">
							<Pin className="h-2.5 w-2.5" />
							<span>PINNED</span>
						</span>
					)}
				</div>

				<p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed min-h-[3.6rem]">
					{project.description}
				</p>

				{/* Topics with fixed single-line overflow */}
				<div className="flex flex-wrap gap-1.5 pt-1 h-7 overflow-hidden">
					{project.topics?.slice(0, 3).map((topic) => (
						<span
							key={topic}
							className="text-[11px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
						>
							#{topic}
						</span>
					))}
				</div>
			</div>

			{/* Footer */}
			<div className="mt-auto pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-1.5">
						<span className={`w-2 h-2 rounded-full ${langColor}`} />
						<span>{project.language}</span>
					</div>

					{project.category === "personal" && (
						<>
							<div className="flex items-center gap-1">
								<Star className="h-3 w-3 text-zinc-500" />
								<span>{project.stars}</span>
							</div>

							<div className="flex items-center gap-1">
								<GitFork className="h-3 w-3 text-zinc-500" />
								<span>{project.forks}</span>
							</div>
						</>
					)}
				</div>

				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onViewReadme(project);
						}}
						aria-label="View README"
						className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors ${
							isPersonal ? "hover:text-emerald-400" : "hover:text-purple-400"
						}`}
					>
						<FileText className="h-3 w-3" />
						<span>README</span>
					</button>

					<a
						href={project.htmlUrl}
						target="_blank"
						rel="noopener noreferrer"
						onClick={(e) => e.stopPropagation()}
						aria-label={`Open ${project.name} on GitHub`}
						className="p-1 rounded text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
					>
						<ExternalLink className="h-3.5 w-3.5" />
					</a>
				</div>
			</div>
		</div>
	);
}
