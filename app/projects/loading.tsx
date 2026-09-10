import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProjectsSkeleton } from "@/features/projects";

export default function ProjectsLoading() {
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
			<ProjectsSkeleton />
		</div>
	);
}
