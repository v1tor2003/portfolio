import { User } from "lucide-react";

export function AboutHeader() {
	return (
		<div className="space-y-6 border-l-2 border-zinc-800 pl-6 font-mono">
			<div className="flex items-center space-x-2 text-zinc-500 text-sm">
				<User className="h-4 w-4" />
				<span>01. ABOUT ME</span>
			</div>

			<div className="space-y-3">
				<h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
					Server-Side Engineering, Distributed Systems & Software Craftsmanship
				</h2>
			</div>

			{/* Detailed Bio Narrative */}
			<div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-4xl">
				<p>
					I am a Backend Software Engineer and Computer Science Bachelor from{" "}
					<span className="text-white font-semibold">
						Universidade Estadual de Santa Cruz (UESC)
					</span>
					. My academic background grounded me in solid computer science
					fundamentals—computational complexity, operating systems, data
					structures, and distributed computing—which directly inform my
					production engineering decisions and system designs.
				</p>

				<p>
					I have high familiarity with and genuinely enjoy working in{" "}
					<span className="text-white font-semibold">Agile and Scrum</span> team
					flows, thriving in sprint cadences that prioritize fast feedback,
					iterative value, and cross-functional collaboration. In my daily
					workflows, I design and build applications adhering to well-structured
					architectural foundations, including{" "}
					<span className="text-white font-semibold">SOLID principles</span>,{" "}
					<span className="text-white font-semibold">Clean Architecture</span>,
					and{" "}
					<span className="text-white font-semibold">
						Domain-Driven Design (DDD)
					</span>
					. By isolating domain logic from infrastructure details, I ensure
					systems remain testable, extensible, and maintainable as business
					requirements evolve.
				</p>

				<p>
					<span className="text-white font-semibold">
						Test-Driven Development (TDD)
					</span>{" "}
					is central to how I craft software. Writing tests first guarantees
					clean interfaces, minimizes regressions, and creates comprehensive
					safety nets for fearless refactoring. On the technical side, I
					specialize in building high-throughput microservices and resilient
					REST APIs using{" "}
					<span className="text-white font-semibold">C# / .NET</span> and{" "}
					<span className="text-white font-semibold">Node.js / TypeScript</span>
					, integrated seamlessly with modern cloud platforms including{" "}
					<span className="text-white font-semibold">AWS</span>, Docker
					containers, and automated CI/CD release pipelines.
				</p>
			</div>
		</div>
	);
}
