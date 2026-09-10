import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ResumeSection } from "@/features/resume";

export const metadata: Metadata = {
	title: "Curriculum Vitae | Vitor Pires",
	description:
		"Curriculum Vitae for Vitor Pires - Backend Software Engineer & Cloud Architect.",
};

export default function ResumePage() {
	return (
		<div className="bg-black text-zinc-100 px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto w-full font-mono space-y-8">
			<Link
				href="/"
				aria-label="Back to home"
				className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors"
			>
				<ArrowLeft className="h-4 w-4" />
				<span>BACK TO HOME</span>
			</Link>
			<ResumeSection />
		</div>
	);
}
