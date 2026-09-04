import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
	return (
		<section
			id="contact"
			className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20"
		>
			<div className="space-y-4 border-l-2 border-zinc-800 pl-6">
				<div className="flex items-center space-x-2 text-zinc-500 font-mono text-sm">
					<Mail className="h-4 w-4" />
					<span>05. GET IN TOUCH</span>
				</div>
				<h2 className="text-3xl sm:text-4xl font-bold text-white font-mono">
					Let's Connect
				</h2>
				<p className="text-zinc-400 max-w-3xl leading-relaxed">
					Have a backend architecture, integration, or distributed systems role?
					Reach out via email or connect on LinkedIn and GitHub.
				</p>
				<div className="pt-2">
					<Button asChild size="lg" className="font-mono">
						<a href="mailto:vitor.pr04@hotmail.com">
							<Mail className="mr-2 h-4 w-4" />
							Say Hello
						</a>
					</Button>
				</div>
			</div>
		</section>
	);
}
