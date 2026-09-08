import { AboutSection } from "@/features/about";
import { ContactSection } from "@/features/contact";
import { HeroSection } from "@/features/hero";
import { MigrationSection } from "@/features/migration";
import { ProjectsSection } from "@/features/projects";
import { ResumeSection } from "@/features/resume";

export default function Home() {
	return (
		<div className="flex flex-col space-y-24 pb-24">
			<HeroSection />
			<AboutSection />
			<ProjectsSection />
			<ResumeSection />
			<MigrationSection />
			<ContactSection />
		</div>
	);
}
