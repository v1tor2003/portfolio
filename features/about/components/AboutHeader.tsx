import { User } from "lucide-react";

export function AboutHeader() {
	return (
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
				reliability, fault-tolerant API design, and automated DevOps workflows.
			</p>
		</div>
	);
}
