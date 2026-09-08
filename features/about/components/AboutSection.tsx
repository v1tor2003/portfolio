import { AboutHeader } from "./AboutHeader";
import { CoreHighlights } from "./CoreHighlights";
import { TechStackGrid } from "./TechStackGrid";

export function AboutSection() {
	return (
		<section
			id="about"
			className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20 space-y-12"
		>
			<AboutHeader />
			<CoreHighlights />
			<TechStackGrid />
		</section>
	);
}
