import { Mail } from "lucide-react";

export function ContactHeader() {
	return (
		<div className="space-y-4">
			<div className="flex items-center space-x-2 text-zinc-500 font-mono text-sm">
				<Mail className="h-4 w-4" />
				<span>05. GET IN TOUCH</span>
			</div>
			<h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
				Let's Connect
			</h2>
			<p className="text-zinc-400 max-w-3xl leading-relaxed font-mono text-sm sm:text-base">
				Have a backend architecture, integration, or distributed systems role?
				Reach out directly or transmit a message packet through the terminal
				transmitter.
			</p>
		</div>
	);
}
