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
			title="Download CV"
			className={`inline-flex h-8 w-8 items-center justify-center rounded border border-zinc-800 bg-black hover:bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all ${className}`}
		>
			<Download className="h-4 w-4" />
		</a>
	);
}
