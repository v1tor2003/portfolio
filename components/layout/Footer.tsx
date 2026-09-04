import { Mail } from "lucide-react";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full border-t border-zinc-800/80 bg-black/90 py-8 font-mono text-xs text-zinc-500">
			<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
				<div className="flex items-center space-x-2">
					<span className="text-zinc-600">[</span>
					<span>© {currentYear} VÍTOR PIRES</span>
					<span className="text-zinc-600">]</span>
					<span className="hidden text-zinc-700 sm:inline">•</span>
					<span className="hidden text-zinc-600 sm:inline">SYS_STATUS: OK</span>
				</div>

				<div className="flex items-center space-x-6">
					<a
						href="https://github.com/v1tor2003"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center space-x-1.5 text-zinc-400 transition-colors hover:text-white"
					>
						<svg
							className="h-4 w-4 fill-current"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
						</svg>
						<span>GitHub</span>
					</a>
					<a
						href="https://linkedin.com/in/vitor-pires"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center space-x-1.5 text-zinc-400 transition-colors hover:text-white"
					>
						<svg
							className="h-4 w-4 fill-current"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
						</svg>
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
			</div>
		</footer>
	);
}
