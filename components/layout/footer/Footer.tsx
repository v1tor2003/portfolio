export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full border-t border-zinc-800/80 bg-black/90 py-6 font-mono text-xs text-zinc-500">
			<div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 sm:px-6 lg:px-8">
				<span>© {currentYear}</span>
				<span className="text-zinc-700">•</span>
				<div className="flex items-center gap-1.5">
					<span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
					<span>SYS_STATUS: OK</span>
				</div>
			</div>
		</footer>
	);
}
