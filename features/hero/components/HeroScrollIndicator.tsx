import { ArrowDown } from "lucide-react";

export function HeroScrollIndicator() {
	return (
		<div
			className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600 animate-bounce"
			aria-hidden="true"
		>
			<ArrowDown className="h-6 w-6" />
		</div>
	);
}
