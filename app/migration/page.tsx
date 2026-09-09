import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { MigrationSection } from "@/features/migration";

export const metadata: Metadata = {
	title: "Migration Journey | Vítor Pires",
	description:
		"Architectural evolution from Vite + React to Next.js and Node to .NET: benchmarks, metrics, and milestones.",
};

export default function MigrationPage() {
	return (
		<div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto w-full font-mono space-y-8">
			<Link
				href="/"
				aria-label="Back to home"
				className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors"
			>
				<ArrowLeft className="h-4 w-4" />
				<span>BACK TO HOME</span>
			</Link>
			<MigrationSection />
		</div>
	);
}
