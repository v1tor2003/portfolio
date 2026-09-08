import { Code2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroActions() {
	return (
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
	);
}
