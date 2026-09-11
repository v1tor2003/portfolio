import { ExternalLink } from "lucide-react";
import type { ResumeLocale } from "../server/resume.service";

interface ResumeExternalOpenButtonProps {
	className?: string;
	locale?: ResumeLocale;
}

export function ResumeOpenExternalButton({
	className = "",
	locale = "en",
}: ResumeExternalOpenButtonProps) {
	return (
		<a
			href={`/api/resume?locale=${locale}`}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Open in new tab"
			title="Open in new tab"
			className={`inline-flex h-8 w-8 items-center justify-center rounded border border-zinc-800 bg-black hover:bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all ${className}`}
		>
			<ExternalLink className="h-4 w-4" />
		</a>
	);
}
