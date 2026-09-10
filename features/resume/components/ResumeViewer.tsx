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
				className={`rounded-lg border border-zinc-800/80 bg-zinc-950/70 p-6 sm:p-8 font-mono shadow-lg transition-all hover:border-zinc-700 hover:bg-zinc-900/30 ${className}`}
			>
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
					<div className="flex items-start gap-4">
						<div className="h-12 w-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 shrink-0">
							<FileText className="h-6 w-6" />
						</div>
						<div className="space-y-1.5">
							<div className="flex flex-wrap items-center gap-2.5">
								<h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
									vitor-pires-resume.pdf
								</h3>
								<span className="flex items-center gap-1 text-[10px] tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded uppercase">
									LATEX COMPILED
								</span>
								<span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
									VECTOR PDF
								</span>
							</div>
							<p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
								Compiled directly from LaTeX source code. Launch the inline
								interactive document viewer or access the raw file.
							</p>
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-3 shrink-0">
						<button
							type="button"
							onClick={() => setIsOpen(true)}
							aria-label="Preview resume"
							className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs sm:text-sm rounded border border-zinc-700 hover:border-emerald-500 transition-all shadow-md hover:shadow-emerald-500/10 cursor-pointer group"
						>
							<Eye className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
							<span>PREVIEW RESUME (PDF)</span>
						</button>

						<a
							href="/api/resume"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-zinc-950/70 hover:bg-zinc-900 text-zinc-400 hover:text-white text-xs sm:text-sm rounded border border-zinc-800 hover:border-zinc-700 transition-colors"
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
			className={`rounded-lg border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-sm overflow-hidden flex flex-col shadow-2xl font-mono ${className}`}
		>
			<div className="flex items-center justify-between px-5 py-3.5 bg-zinc-900/70 border-b border-zinc-800 text-xs text-zinc-300">
				<div className="flex items-center space-x-2.5">
					<FileText className="h-4 w-4 text-emerald-400 shrink-0" />
					<span className="font-semibold text-white">
						vitor-pires-resume.pdf
					</span>
					<span className="text-zinc-500 hidden sm:inline">
						— Compiled Vector PDF
					</span>
				</div>

				<div className="flex items-center gap-4">
					<a
						href="/api/resume"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1 hover:text-white transition-colors"
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

			<div className="relative w-full bg-zinc-950 min-h-[600px] h-[75vh]">
				<iframe
					src="/api/resume"
					title="Resume Preview"
					className="w-full h-full border-0"
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
