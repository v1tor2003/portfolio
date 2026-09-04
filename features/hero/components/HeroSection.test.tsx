import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroSection } from "./HeroSection";

describe("HeroSection Component", () => {
	it("renders main heading and cloud architect title", () => {
		render(<HeroSection />);
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			"VÍTOR PIRES.",
		);
		expect(screen.getByText("Backend Software Engineer.")).toBeInTheDocument();
	});

	it("renders call to action buttons with correct anchors", () => {
		render(<HeroSection />);
		const projectsLink = screen.getByText("View Backend Projects").closest("a");
		const contactLink = screen.getByText("Contact Me").closest("a");

		expect(projectsLink).toHaveAttribute("href", "#projects");
		expect(contactLink).toHaveAttribute("href", "#contact");
	});
});
