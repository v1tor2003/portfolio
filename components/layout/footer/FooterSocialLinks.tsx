import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

export function FooterSocialLinks() {
	return (
		<div className="flex items-center space-x-6">
			<a
				href="https://github.com/v1tor2003"
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center space-x-1.5 text-zinc-400 transition-colors hover:text-white"
			>
				<GithubIcon size={16} />
				<span>GitHub</span>
			</a>
			<a
				href="https://linkedin.com/in/pires-vitor"
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center space-x-1.5 text-zinc-400 transition-colors hover:text-white"
			>
				<LinkedinIcon size={16} />
				<span>LinkedIn</span>
			</a>
			<a
				href="mailto:vitor.pr04@hotmail.com"
				className="flex items-center space-x-1.5 text-zinc-400 transition-colors hover:text-white"
			>
				<Mail className="h-4 w-4" />
				<span>Email</span>
			</a>
		</div>
	);
}
