import { ExternalLink, FileText } from "lucide-react";

interface ResumeViewerProps {
	className?: string;
}

export function ResumeViewer({ className = "" }: ResumeViewerProps) {
	return (
		<div
			className={`rounded-lg border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm overflow-hidden flex flex-col shadow-2xl font-mono ${className}`}
		>
			<div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 text-xs text-zinc-400">
				<div className="flex items-center space-x-2">
					<div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
					<div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
					<div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
					<span className="ml-2 font-semibold text-zinc-300 flex items-center gap-1.5">
						<FileText className="h-3.5 w-3.5 text-emerald-400" />[
						RESUME_PREVIEW: vitor-pires-resume.pdf ]
					</span>
				</div>

				<a
					href="/api/resume"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-1 hover:text-zinc-200 transition-colors"
					aria-label="Open in new tab"
				>
					<span>OPEN IN NEW TAB</span>
					<ExternalLink className="h-3.5 w-3.5" />
				</a>
			</div>

			<div className="relative w-full bg-zinc-900/50 min-h-[600px] h-[75vh]">
				<iframe
					src="/api/resume"
					title="Resume Preview"
					className="w-full h-full border-0 rounded-b"
				/>
				<noscript>
					<div className="p-8 text-center text-sm text-zinc-400">
						JavaScript is required for inline preview. Please{" "}
						<a
							href="/api/resume"
							className="underline text-emerald-400 hover:text-emerald-300"
						>
							download the PDF directly
						</a>
						.
					</div>
				</noscript>
			</div>
		</div>
	);
}
