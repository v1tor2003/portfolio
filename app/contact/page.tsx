import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/features/contact";

export const metadata: Metadata = {
	title: "Contact | Vítor Pires",
	description:
		"Get in touch with Vítor Pires via secure channels or interactive command line terminal interface.",
};

export default function ContactPage() {
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
			<ContactSection />
		</div>
	);
}
