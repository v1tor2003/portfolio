import { ArrowRight, BookOpen, Code2, Cpu, FileText, Mail } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/features/hero";

const NAVIGATION_CARDS = [
	{
		title: "01. ABOUT",
		description:
			"Server-side engineering, cloud infrastructure, and technical background.",
		href: "/about",
		icon: Cpu,
		badge: "BACKGROUND",
	},
	{
		title: "02. PROJECTS",
		description:
			"Enterprise microservices, command-api, and open-source backend tools.",
		href: "/projects",
		icon: Code2,
		badge: "OPEN SOURCE",
	},
	{
		title: "03. RESUME",
		description:
			"Curriculum Vitae synchronized from dedicated repository with PDF download.",
		href: "/resume",
		icon: FileText,
		badge: "SYNCED PDF",
	},
	{
		title: "04. MIGRATION",
		description:
			"Architectural evolution benchmarks: Vite to Next.js and Node to .NET.",
		href: "/migration",
		icon: BookOpen,
		badge: "BENCHMARKS",
	},
	{
		title: "05. CONTACT",
		description:
			"Direct communication channels and interactive CLI terminal interface.",
		href: "/contact",
		icon: Mail,
		badge: "CONNECT",
	},
];

export default function Home() {
	return (
		<div className="flex flex-col space-y-16 pb-24">
			<HeroSection />

			<section
				id="explore"
				aria-label="System Exploration"
				className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8 font-mono"
			>
				<div className="space-y-2 border-l-2 border-zinc-800 pl-6">
					<div className="text-xs text-zinc-500 font-semibold tracking-wider">
						[ ARCHITECTURE & SECTIONS ]
					</div>
					<h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
						Explore The Architecture
					</h2>
					<p className="text-zinc-400 max-w-2xl text-sm leading-relaxed">
						Navigate through dedicated system dossiers covering cloud
						engineering, open-source packages, migration benchmarks, and
						interactive contact.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{NAVIGATION_CARDS.map((card) => {
						const Icon = card.icon;
						return (
							<Link
								key={card.href}
								href={card.href}
								className="group relative rounded-lg border border-zinc-800 bg-zinc-950/60 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/40 backdrop-blur-sm flex flex-col justify-between space-y-4"
							>
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<div className="flex h-10 w-10 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-400 group-hover:border-zinc-600 group-hover:text-white transition-colors">
											<Icon className="h-5 w-5" />
										</div>
										<span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900/80 text-zinc-400">
											{card.badge}
										</span>
									</div>

									<div className="space-y-1">
										<h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors flex items-center justify-between">
											<span>{card.title}</span>
											<ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-400" />
										</h3>
										<p className="text-xs text-zinc-400 leading-relaxed font-sans">
											{card.description}
										</p>
									</div>
								</div>

								<div className="pt-2 text-[11px] text-zinc-500 font-mono flex items-center gap-1 group-hover:text-zinc-400 transition-colors">
									<span>OPEN_VIEW</span>
									<span className="text-emerald-500">→</span>
									<span className="text-zinc-600">{card.href}</span>
								</div>
							</Link>
						);
					})}
				</div>
			</section>
		</div>
	);
}
