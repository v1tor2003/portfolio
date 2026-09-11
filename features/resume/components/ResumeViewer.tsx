"use client";

import { ExternalLink, Eye, FileText, X } from "lucide-react";
import { useState } from "react";
import type { ResumeLocale } from "../server/resume.service";
import { ResumeDownloadButton } from "./ResumeDownloadButton";

interface ResumeViewerProps {
	className?: string;
	initialOpen?: boolean;
	initialLocale?: ResumeLocale;
}

export function ResumeViewer({
	className = "",
	initialOpen = false,
	initialLocale = "en",
}: ResumeViewerProps) {
	const [isOpen, setIsOpen] = useState(initialOpen);
	const [locale, setLocale] = useState<ResumeLocale>(initialLocale);

	const fileName = `vitor-pires-resume-${locale}.pdf`;

	const LocaleToggle = (
		<div className="flex items-center rounded border border-zinc-800 bg-zinc-950 p-0.5 text-xs font-mono">
			<button
				type="button"
				onClick={() => setLocale("en")}
				aria-pressed={locale === "en"}
				className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
					locale === "en"
						? "bg-zinc-800 text-white font-semibold"
						: "text-zinc-400 hover:text-zinc-200"
				}`}
			>
				EN
			</button>
			<button
				type="button"
				onClick={() => setLocale("pt-BR")}
				aria-pressed={locale === "pt-BR"}
				className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
					locale === "pt-BR"
						? "bg-zinc-800 text-white font-semibold"
						: "text-zinc-400 hover:text-zinc-200"
				}`}
			>
				PT-BR
			</button>
		</div>
	);

	if (!isOpen) {
		return (
			<div
				className={`rounded-lg border border-zinc-800 bg-black p-6 sm:p-8 font-mono shadow-xl transition-all duration-200 hover:border-zinc-700 ${className}`}
			>
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
					<div className="flex items-start gap-4">
						<div className="h-12 w-12 rounded-lg bg-black border border-zinc-800 flex items-center justify-center text-white shrink-0">
							<FileText className="h-6 w-6" />
						</div>
						<div className="space-y-1.5">
							<div className="flex flex-wrap items-center gap-2.5">
								<h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
									{fileName}
								</h3>
								<span className="flex items-center gap-1 text-[10px] tracking-wider text-white bg-black border border-zinc-700 px-2 py-0.5 rounded uppercase font-semibold">
									{locale === "en" ? "LATEX COMPILED" : "PT-BR LOCALE"}
								</span>
								<span className="text-[10px] tracking-wider text-zinc-400 bg-black border border-zinc-800 px-2 py-0.5 rounded uppercase">
									VECTOR PDF
								</span>
							</div>
							<p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
								{locale === "en"
									? "Compiled directly from LaTeX source code. Launch the inline interactive document viewer or access the raw file."
									: "Versão em Português Brasileiro compilada e pronta para visualização interativa ou download."}
							</p>
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-3 shrink-0">
						{LocaleToggle}

						<button
							type="button"
							onClick={() => setIsOpen(true)}
							aria-label="Preview resume"
							className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-200 text-black font-bold text-xs sm:text-sm rounded border border-white transition-all shadow-md cursor-pointer group"
						>
							<Eye className="h-4 w-4 text-black group-hover:scale-110 transition-transform" />
							<span>PREVIEW RESUME (PDF)</span>
						</button>

						<ResumeDownloadButton locale={locale} />

						<a
							href={`/api/resume?locale=${locale}`}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Open in new tab"
							className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-black hover:bg-zinc-900 text-zinc-300 hover:text-white text-xs sm:text-sm rounded border border-zinc-800 hover:border-zinc-700 transition-colors"
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
			className={`rounded-lg border border-zinc-800 bg-black overflow-hidden flex flex-col shadow-2xl font-mono ${className}`}
		>
			<div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-black border-b border-zinc-800 text-xs text-white">
				<div className="flex items-center space-x-2.5">
					<FileText className="h-4 w-4 text-white shrink-0" />
					<span className="font-semibold text-white">{fileName}</span>
					<span className="text-zinc-500 hidden sm:inline">
						— Compiled Vector PDF
					</span>
				</div>

				<div className="flex flex-wrap items-center gap-3">
					{LocaleToggle}

					<ResumeDownloadButton locale={locale} />

					<a
						href={`/api/resume?locale=${locale}`}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
						aria-label="Open in new tab"
					>
						<span>OPEN IN NEW TAB</span>
						<ExternalLink className="h-3.5 w-3.5" />
					</a>

					<button
						type="button"
						onClick={() => setIsOpen(false)}
						className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
						aria-label="Close preview"
					>
						<X className="h-4 w-4" />
						<span className="hidden sm:inline">CLOSE PREVIEW</span>
					</button>
				</div>
			</div>

			<div className="relative w-full bg-black min-h-[600px] h-[75vh]">
				<iframe
					src={`/api/resume?locale=${locale}`}
					title="Resume Preview"
					className="w-full h-full border-0 bg-black"
				/>
				<noscript>
					<div className="p-8 text-center text-sm text-zinc-400">
						JavaScript is required for inline preview. Please{" "}
						<a
							href={`/api/resume?locale=${locale}`}
							className="underline text-white hover:text-zinc-300"
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
