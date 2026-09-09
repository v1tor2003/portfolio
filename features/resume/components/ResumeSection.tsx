import { ExternalLink, FileText } from "lucide-react";
import { ResumeDownloadButton } from "./ResumeDownloadButton";

export function ResumeSection() {
	return (
		<section
			id="resume"
			className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20"
		>
			<div className="space-y-6 border-l-2 border-zinc-800 pl-6 font-mono">
				<div className="space-y-2">
					<div className="flex items-center space-x-2 text-zinc-500 text-sm">
						<FileText className="h-4 w-4" />
						<span>03. RESUME SYNC</span>
					</div>
					<h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
						Curriculum Vitae
					</h2>
					<p className="text-zinc-400 max-w-3xl leading-relaxed text-sm sm:text-base font-sans">
						Synchronized on-demand from my dedicated LaTeX resume repository.
						Preview the full document online or download the compiled PDF
						version.
					</p>
				</div>

				<div className="flex flex-wrap items-center gap-4 pt-2">
					<ResumeDownloadButton />

					<a
						href="/resume"
						aria-label="Preview online"
						className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-950/70 hover:bg-zinc-900 text-zinc-300 hover:text-white text-xs sm:text-sm font-semibold rounded border border-zinc-800 hover:border-zinc-700 transition-colors"
					>
						<span>PREVIEW ONLINE</span>
						<ExternalLink className="h-4 w-4 text-zinc-500" />
					</a>
				</div>
			</div>
		</section>
	);
}
