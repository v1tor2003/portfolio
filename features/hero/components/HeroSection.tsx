import { ArrowDown, Code2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
	return (
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
					I build resilient server-side architectures, high-throughput APIs, and
					distributed microservices using .NET, Node.js, and Go—designed to
					harness managed cloud primitives across AWS and modern cloud
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
	);
}
