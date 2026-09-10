import { ExternalLink, FileText } from "lucide-react";
import { ResumeDownloadButton } from "./ResumeDownloadButton";
import { ResumeViewer } from "./ResumeViewer";

export function ResumeSection() {
	return (
		<section id="resume" className="w-full scroll-mt-20 space-y-8">
			<div className="space-y-4 border-l-2 border-zinc-800 pl-6 font-mono">
				<div className="space-y-2">
					<div className="flex items-center space-x-2 text-zinc-500 font-mono text-sm">
						<FileText className="h-4 w-4" />
						<span>03. RESUME SYNC</span>
					</div>
					<h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
						Curriculum Vitae
					</h2>
					<p className="text-zinc-400 max-w-3xl leading-relaxed font-mono text-sm sm:text-base">
						Synchronized on-demand from the dedicated LaTeX resume repository.
						Preview the full rendered PDF below or trigger a direct download.
					</p>
				</div>

				<div className="flex flex-wrap items-center gap-4 pt-2">
					<ResumeDownloadButton />

					<a
						href="/api/resume"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Preview online"
						className="inline-flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-zinc-900 text-zinc-300 hover:text-white text-xs sm:text-sm font-semibold rounded border border-zinc-800 hover:border-zinc-600 transition-colors"
					>
						<span>OPEN IN NEW TAB</span>
						<ExternalLink className="h-4 w-4 text-zinc-400" />
					</a>
				</div>
			</div>

			<ResumeViewer />
		</section>
	);
}
