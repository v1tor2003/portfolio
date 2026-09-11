import { FileText } from "lucide-react";
import { ResumeViewer } from "./ResumeViewer";

export function ResumeSection() {
	return (
		<section id="resume" className="w-full scroll-mt-20 space-y-8">
			<div className="space-y-4 border-l-2 border-zinc-800 pl-6 font-mono">
				<div className="space-y-2">
					<div className="flex items-center space-x-2 text-zinc-500 font-mono text-sm">
						<FileText className="h-4 w-4" />
						<span>03. RESUME</span>
					</div>
					<h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
						Curriculum Vitae
					</h2>
					<p className="text-zinc-400 max-w-3xl leading-relaxed font-mono text-sm sm:text-base">
						Synchronized on-demand from the dedicated LaTeX resume repository.
						Preview the full rendered PDF below or trigger a direct download in
						your preferred language.
					</p>
				</div>
			</div>

			<ResumeViewer />
		</section>
	);
}
