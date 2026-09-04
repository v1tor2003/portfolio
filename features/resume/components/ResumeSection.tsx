import { FileText } from "lucide-react";

export function ResumeSection() {
	return (
		<section
			id="resume"
			className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20"
		>
			<div className="space-y-4 border-l-2 border-zinc-800 pl-6">
				<div className="flex items-center space-x-2 text-zinc-500 font-mono text-sm">
					<FileText className="h-4 w-4" />
					<span>03. RESUME SYNC</span>
				</div>
				<h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
					Curriculum Vitae
				</h2>
				<p className="text-zinc-400 max-w-3xl leading-relaxed">
					Automatically compiled from LaTeX source on every GitHub release.
					Download or preview the PDF directly inline.
				</p>
			</div>
		</section>
	);
}
