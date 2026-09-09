"use client";

import { ExternalLink, Eye, FileText, X } from "lucide-react";
import { useState } from "react";

interface ResumeViewerProps {
	className?: string;
	initialOpen?: boolean;
}

export function ResumeViewer({
	className = "",
	initialOpen = false,
}: ResumeViewerProps) {
	const [isOpen, setIsOpen] = useState(initialOpen);

	if (!isOpen) {
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
							<FileText className="h-3.5 w-3.5 text-emerald-400" />
							{"[ RESUME_VIEWER // VITOR_PIRES ]"}
						</span>
					</div>

					<span className="text-[10px] px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-400">
						STANDBY
					</span>
				</div>

				<div className="py-16 px-6 flex flex-col items-center justify-center text-center space-y-6">
					<div className="h-16 w-16 rounded-full border border-zinc-800 bg-zinc-900/90 flex items-center justify-center shadow-inner text-emerald-400">
						<FileText className="h-8 w-8" />
					</div>

					<div className="space-y-2 max-w-md">
						<h3 className="text-lg font-bold text-white tracking-tight">
							Vector PDF Resume Document
						</h3>
						<p className="text-xs text-zinc-400 leading-relaxed font-sans">
							Compiled on demand from dedicated LaTeX sources. Launch the inline
							preview viewer or download the document directly.
						</p>
					</div>

					<div className="flex flex-wrap items-center justify-center gap-4 pt-2">
						<button
							type="button"
							onClick={() => setIsOpen(true)}
							aria-label="Preview resume"
							className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs sm:text-sm font-semibold rounded border border-zinc-700 hover:border-emerald-500 transition-all shadow-lg hover:shadow-emerald-500/10 cursor-pointer group"
						>
							<Eye className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
							<span>PREVIEW RESUME (PDF)</span>
						</button>

						<a
							href="/api/resume"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 px-4 py-3 bg-zinc-950/60 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 text-xs sm:text-sm font-mono rounded border border-zinc-800 transition-colors"
						>
							<span>OPEN IN NEW TAB</span>
							<ExternalLink className="h-3.5 w-3.5" />
						</a>
					</div>
				</div>
			</div>
		);
	}

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
						<FileText className="h-3.5 w-3.5 text-emerald-400" />
						{"[ RESUME_PREVIEW: vitor-pires-resume.pdf ]"}
					</span>
				</div>

				<div className="flex items-center gap-4">
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

					<button
						type="button"
						onClick={() => setIsOpen(false)}
						aria-label="Close preview"
						className="flex items-center gap-1 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
					>
						<X className="h-3.5 w-3.5" />
						<span>CLOSE PREVIEW</span>
					</button>
				</div>
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
