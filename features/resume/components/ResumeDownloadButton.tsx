import { Download } from "lucide-react";

interface ResumeDownloadButtonProps {
	className?: string;
}

export function ResumeDownloadButton({
	className = "",
}: ResumeDownloadButtonProps) {
	return (
		<a
			href="/api/resume?download=true"
			download="vitor-pires-resume.pdf"
			aria-label="Download CV"
			className={`inline-flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-zinc-900 text-white font-mono text-xs sm:text-sm font-semibold rounded border border-zinc-700 hover:border-zinc-500 transition-all duration-150 ${className}`}
		>
			<Download className="h-4 w-4 text-white" />
			<span>DOWNLOAD CV</span>
			<span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-700">
				PDF
			</span>
		</a>
	);
}
