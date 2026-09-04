import { Mail } from "lucide-react";
import { ContactChannels } from "./ContactChannels";
import { ContactTerminal } from "./ContactTerminal";

export function ContactSection() {
	return (
		<section
			id="contact"
			className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20"
		>
			<div className="space-y-12 border-l-2 border-zinc-800 pl-6">
				<div className="space-y-4">
					<div className="flex items-center space-x-2 text-zinc-500 font-mono text-sm">
						<Mail className="h-4 w-4" />
						<span>05. GET IN TOUCH</span>
					</div>
					<h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
						Let's Connect
					</h2>
					<p className="text-zinc-400 max-w-3xl leading-relaxed font-mono text-sm sm:text-base">
						Have a backend architecture, integration, or distributed systems
						role? Reach out directly or transmit a message packet through the
						terminal transmitter.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
					<div className="lg:col-span-5">
						<ContactChannels />
					</div>
					<div className="mt-8 lg:mt-0 lg:col-span-7">
						<ContactTerminal />
					</div>
				</div>
			</div>
		</section>
	);
}
