export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full border-t border-zinc-800/80 bg-black/90 py-6 font-mono text-xs text-zinc-500">
			<div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 sm:px-6 lg:px-8">
				<span>© {currentYear}</span>
			</div>
		</footer>
	);
}
