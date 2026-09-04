import { AboutSection } from "@/features/about/components/AboutSection";
import { ContactSection } from "@/features/contact/components/ContactSection";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { MigrationSection } from "@/features/migration/components/MigrationSection";
import { ProjectsSection } from "@/features/projects/components/ProjectsSection";
import { ResumeSection } from "@/features/resume/components/ResumeSection";

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
