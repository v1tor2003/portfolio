import { FooterSocialLinks } from "./FooterSocialLinks";

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

				<FooterSocialLinks />
			</div>
		</footer>
	);
}
