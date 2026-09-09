import { ArrowLeft, FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ResumeDownloadButton, ResumeViewer } from "@/features/resume";

export const metadata: Metadata = {
	title: "Curriculum Vitae | Vitor Pires",
	description:
		"Curriculum Vitae for Vitor Pires - Backend Software Engineer & Cloud Architect.",
};

export default function ResumePage() {
	return (
		<div className="bg-black text-zinc-100 px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto font-mono">
			<div className="space-y-8">
				<div className="flex items-center justify-between">
					<Link
						href="/"
						aria-label="Back to portfolio"
						className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors"
					>
						<ArrowLeft className="h-4 w-4" />
						<span>BACK TO HOME</span>
					</Link>

					<ResumeDownloadButton />
				</div>

				<div className="space-y-2 border-l-2 border-zinc-800 pl-6">
					<div className="flex items-center space-x-2 text-zinc-500 text-sm">
						<FileText className="h-4 w-4 text-emerald-400" />
						<span>{"DOCUMENT_VIEWER // VITOR_PIRES"}</span>
					</div>
					<h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
						Resume
					</h1>
					<p className="text-zinc-400 max-w-3xl leading-relaxed text-sm sm:text-base font-sans">
						Synchronized on-demand from the dedicated LaTeX resume repository.
						Preview the full rendered PDF below or trigger a direct download.
					</p>
				</div>

				<ResumeViewer />
			</div>
		</div>
	);
}
