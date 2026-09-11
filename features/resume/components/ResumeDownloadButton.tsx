import { Download } from "lucide-react";
import type { ResumeLocale } from "../server/resume.service";

interface ResumeDownloadButtonProps {
	className?: string;
	locale?: ResumeLocale;
}

export function ResumeDownloadButton({
	className = "",
	locale = "en",
}: ResumeDownloadButtonProps) {
	const downloadFileName = `vitor-pires-resume-${locale}.pdf`;

	return (
		<a
			href={`/api/resume?locale=${locale}&download=true`}
			download={downloadFileName}
			aria-label="Download CV"
			className={`inline-flex items-center gap-2 px-3.5 py-2 bg-black hover:bg-zinc-900 text-white font-mono text-xs sm:text-sm font-semibold rounded border border-zinc-700 hover:border-zinc-500 transition-all duration-150 ${className}`}
		>
			<Download className="h-3.5 w-3.5 text-white" />
			<span>DOWNLOAD CV</span>
			<span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-700">
				{locale === "pt-BR" ? "PT-BR" : "EN"}
			</span>
		</a>
	);
}
