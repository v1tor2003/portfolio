"use client";

import { Eye, FileText, X } from "lucide-react";
import { useState } from "react";
import type { ResumeLocale } from "../server/resume.service";
import { ResumeDownloadButton } from "./ResumeDownloadButton";
import { ResumeOpenExternalButton } from "./ResumeOpenExternalButton";

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
		<div className="flex h-8 items-center rounded border border-zinc-800 bg-zinc-950 p-0.5 text-xs font-mono">
			<button
				type="button"
				onClick={() => setLocale("en")}
				aria-pressed={locale === "en"}
				className={`h-full px-2.5 flex items-center justify-center rounded transition-colors cursor-pointer text-xs font-semibold ${
					locale === "en"
						? "bg-zinc-800 text-white"
						: "text-zinc-400 hover:text-zinc-200"
				}`}
			>
				EN
			</button>
			<button
				type="button"
				onClick={() => setLocale("pt-BR")}
				aria-pressed={locale === "pt-BR"}
				className={`h-full px-2.5 flex items-center justify-center rounded transition-colors cursor-pointer text-xs font-semibold ${
					locale === "pt-BR"
						? "bg-zinc-800 text-white"
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
							</div>
						</div>
					</div>

					<div className="flex items-center gap-2 shrink-0">
						{LocaleToggle}

						<button
							type="button"
							onClick={() => setIsOpen(true)}
							aria-label="Preview resume"
							title="Preview resume"
							className="inline-flex h-8 w-8 items-center justify-center rounded border border-white bg-white hover:bg-zinc-200 text-black transition-all shadow-sm cursor-pointer group"
						>
							<Eye className="h-4 w-4 text-black group-hover:scale-110 transition-transform" />
						</button>

						<ResumeDownloadButton locale={locale} />
						<ResumeOpenExternalButton locale={locale} />
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
				</div>

				<div className="flex items-center gap-2">
					{LocaleToggle}

					<ResumeDownloadButton locale={locale} />
					<ResumeOpenExternalButton locale={locale} />

					<button
						type="button"
						onClick={() => setIsOpen(false)}
						className="inline-flex h-8 w-8 items-center justify-center rounded border border-zinc-800 bg-black hover:bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
						aria-label="Close preview"
						title="Close preview"
					>
						<X className="h-4 w-4" />
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
