import { AboutHeader } from "./AboutHeader";
import { CoreHighlights } from "./CoreHighlights";
import { TechStackGrid } from "./TechStackGrid";

export function AboutSection() {
	return (
		<section id="about" className="w-full scroll-mt-20 space-y-12">
			<AboutHeader />
			<CoreHighlights />
			<TechStackGrid />
		</section>
	);
}
