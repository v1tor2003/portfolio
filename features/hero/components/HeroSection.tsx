import { HeroActions } from "./HeroActions";
import { HeroBio } from "./HeroBio";
import { HeroHeading } from "./HeroHeading";
import { HeroScrollIndicator } from "./HeroScrollIndicator";

export function HeroSection() {
	return (
		<section
			id="hero"
			className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
		>
			<div className="space-y-6 animate-hero-fade-in">
				<HeroHeading />
				<HeroBio />
				<HeroActions />
			</div>

			<HeroScrollIndicator />
		</section>
	);
}
