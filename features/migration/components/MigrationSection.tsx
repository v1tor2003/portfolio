import { Server } from "lucide-react";

export function MigrationSection() {
	return (
		<section
			id="migration"
			className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20"
		>
			<div className="space-y-4 border-l-2 border-zinc-800 pl-6">
				<div className="flex items-center space-x-2 text-zinc-500 font-mono text-sm">
					<Server className="h-4 w-4" />
					<span>04. MIGRATION JOURNEY</span>
				</div>
				<h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
					Portfolio v2 Architecture
				</h2>
				<p className="text-zinc-400 max-w-3xl leading-relaxed">
					Read the technical breakdown of migrating from Create React App to
					Next.js 16 App Router, TypeScript 7, Biome, and automated CI
					pipelines.
				</p>
			</div>
		</section>
	);
}
