"use client";

import {
	ArrowDown,
	Code2,
	FileText,
	GitBranch,
	Mail,
	Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AboutSection } from "@/features/about/components/AboutSection";

export default function Home() {
	return (
		<div className="flex flex-col space-y-24 pb-24">
			{/* HERO SECTION */}
			<section
				id="hero"
				className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
			>
				<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
					<div className="inline-flex items-center space-x-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-400 backdrop-blur-sm">
						<span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
						<span>SYSTEM_READY [ BACKEND_ENGINEER ]</span>
					</div>

					<div className="space-y-2">
						<h2 className="text-zinc-500 font-mono text-lg sm:text-xl">
							Hi, my name is
						</h2>
						<h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white font-mono">
							VÍTOR PIRES<span className="text-zinc-600">.</span>
						</h1>
						<h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-zinc-400 font-mono">
							Backend Software Engineer.
						</h3>
					</div>

					<p className="max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed">
						I build resilient server-side architectures, high-throughput APIs,
						and distributed microservices using .NET, Node.js, and Go—designed
						to harness managed cloud primitives across AWS and modern cloud
						platforms.
					</p>

					<div className="flex flex-wrap gap-4 pt-4">
						<Button asChild size="lg" className="font-mono">
							<a href="#projects">
								<Code2 className="mr-2 h-4 w-4" />
								View Backend Projects
							</a>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="font-mono border-zinc-800 hover:border-zinc-600"
						>
							<a href="#contact">
								<Mail className="mr-2 h-4 w-4" />
								Contact Me
							</a>
						</Button>
					</div>
				</div>

				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600 animate-bounce">
					<ArrowDown className="h-6 w-6" />
				</div>
			</section>

			<AboutSection />

			{/* PROJECTS SECTION */}
			<section
				id="projects"
				className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20"
			>
				<div className="space-y-4 border-l-2 border-zinc-800 pl-6">
					<div className="flex items-center space-x-2 text-zinc-500 font-mono text-sm">
						<GitBranch className="h-4 w-4" />
						<span>02. FEATURED PROJECTS</span>
					</div>
					<h2 className="text-3xl sm:text-4xl font-bold text-white">
						Backend Open Source & Cloud Work
					</h2>
					<p className="text-zinc-400 max-w-3xl leading-relaxed">
						Explore personal open-source packages (such as
						`@v1tor2003/command-api`), payment processing integrations, and
						production services built for reliability, concurrency, and scale.
					</p>
				</div>
			</section>

			{/* RESUME SECTION */}
			<section
				id="resume"
				className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20"
			>
				<div className="space-y-4 border-l-2 border-zinc-800 pl-6">
					<div className="flex items-center space-x-2 text-zinc-500 font-mono text-sm">
						<FileText className="h-4 w-4" />
						<span>03. RESUME SYNC</span>
					</div>
					<h2 className="text-3xl sm:text-4xl font-bold text-white">
						Curriculum Vitae
					</h2>
					<p className="text-zinc-400 max-w-3xl leading-relaxed">
						Automatically compiled from LaTeX source on every GitHub release.
						Download or preview the PDF directly inline.
					</p>
				</div>
			</section>

			{/* MIGRATION SECTION */}
			<section
				id="migration"
				className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20"
			>
				<div className="space-y-4 border-l-2 border-zinc-800 pl-6">
					<div className="flex items-center space-x-2 text-zinc-500 font-mono text-sm">
						<Server className="h-4 w-4" />
						<span>04. MIGRATION JOURNEY</span>
					</div>
					<h2 className="text-3xl sm:text-4xl font-bold text-white">
						Portfolio v2 Architecture
					</h2>
					<p className="text-zinc-400 max-w-3xl leading-relaxed">
						A technical breakdown of migrating from a legacy client-side React
						app to a modern Next.js App Router setup, TypeScript, strict
						linting, and automated deployment workflows.
					</p>
				</div>
			</section>

			{/* CONTACT SECTION */}
			<section
				id="contact"
				className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20"
			>
				<div className="space-y-4 border-l-2 border-zinc-800 pl-6">
					<div className="flex items-center space-x-2 text-zinc-500 font-mono text-sm">
						<Mail className="h-4 w-4" />
						<span>05. GET IN TOUCH</span>
					</div>
					<h2 className="text-3xl sm:text-4xl font-bold text-white">
						Let's Connect
					</h2>
					<p className="text-zinc-400 max-w-3xl leading-relaxed">
						Have a backend architecture, integration, or distributed systems
						role? Reach out via email or connect on LinkedIn and GitHub.
					</p>
				</div>
			</section>
		</div>
	);
}
