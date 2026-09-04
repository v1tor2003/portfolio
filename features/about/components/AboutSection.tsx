import { Cpu, Server, Shield, Terminal, User } from "lucide-react";
import { SkillBadge } from "./SkillBadge";

const SKILL_GROUPS = [
	{
		title: "// BACKEND & LANGUAGES",
		skills: ["C#", ".NET", "Node.js", "TypeScript", "Go", "REST APIs"],
	},
	{
		title: "// CLOUD & INFRASTRUCTURE",
		skills: [
			"AWS",
			"DigitalOcean",
			"Railway",
			"Azure",
			"Docker",
			"CI/CD Pipelines",
		],
	},
	{
		title: "// DATABASES & ARCHITECTURE",
		skills: [
			"PostgreSQL",
			"MongoDB",
			"Redis",
			"Microservices",
			"Distributed Systems",
			"Clean Architecture",
		],
	},
];

export function AboutSection() {
	return (
		<section
			id="about"
			className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20 space-y-12"
		>
			<div className="space-y-4 border-l-2 border-zinc-800 pl-6">
				<div className="flex items-center space-x-2 text-zinc-500 font-mono text-sm">
					<User className="h-4 w-4" />
					<span>01. ABOUT ME</span>
				</div>
				<h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
					Server-Side Engineering & Cloud Integration
				</h2>
				<p className="text-zinc-400 max-w-3xl leading-relaxed">
					I am a Backend Software Engineer specializing in building scalable,
					high-availability server systems and cloud infrastructure. With deep
					hands-on experience across C#, Node.js, and cloud platforms like AWS,
					DigitalOcean, Railway, and Azure environments, I focus on system
					reliability, fault-tolerant API design, and automated DevOps
					workflows.
				</p>
			</div>

			{/* CORE HIGHLIGHTS GRID */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
				<div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-6 space-y-3 backdrop-blur-sm">
					<div className="flex items-center space-x-3 text-white">
						<Server className="h-5 w-5 text-zinc-400" />
						<h3 className="font-semibold text-base">Backend Architecture</h3>
					</div>
					<p className="text-xs text-zinc-400 leading-relaxed">
						Designing resilient microservices, high-throughput REST APIs, and
						event-driven systems in C# and TypeScript.
					</p>
				</div>

				<div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-6 space-y-3 backdrop-blur-sm">
					<div className="flex items-center space-x-3 text-white">
						<Cpu className="h-5 w-5 text-zinc-400" />
						<h3 className="font-semibold text-base">Cloud & Infrastructure</h3>
					</div>
					<p className="text-xs text-zinc-400 leading-relaxed">
						Deploying and managing workloads on AWS, DigitalOcean, Railway, and
						bare-metal VPS with Docker and CI/CD automation.
					</p>
				</div>

				<div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-6 space-y-3 backdrop-blur-sm">
					<div className="flex items-center space-x-3 text-white">
						<Shield className="h-5 w-5 text-zinc-400" />
						<h3 className="font-semibold text-base">Data & System Integrity</h3>
					</div>
					<p className="text-xs text-zinc-400 leading-relaxed">
						Optimizing database schemas with PostgreSQL and Redis, ensuring
						strict data validity, caching, and sub-millisecond query
						performance.
					</p>
				</div>
			</div>

			{/* TECH STACK BADGES */}
			<div className="space-y-6">
				<div className="flex items-center space-x-2 text-zinc-400 font-mono text-sm">
					<Terminal className="h-4 w-4" />
					<span>TECHNICAL STACK & CLOUD ECOSYSTEM</span>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{SKILL_GROUPS.map((group) => (
						<div
							key={group.title}
							className="rounded-lg border border-zinc-800/80 bg-black/40 p-5 space-y-4"
						>
							<h4 className="font-mono text-xs font-semibold text-zinc-400">
								{group.title}
							</h4>
							<div className="flex flex-wrap gap-2">
								{group.skills.map((skill) => (
									<SkillBadge key={skill} name={skill} />
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
