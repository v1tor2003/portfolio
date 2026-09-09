import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroActions } from "./HeroActions";
import { HeroBadge } from "./HeroBadge";
import { HeroBio } from "./HeroBio";
import { HeroHeading } from "./HeroHeading";
import { HeroSection } from "./HeroSection";

describe("HeroSection Component", () => {
	it("renders main heading and cloud architect title", () => {
		render(<HeroSection />);
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			"VÍTOR PIRES.",
		);
		expect(screen.getByText("Backend Software Engineer.")).toBeInTheDocument();
		expect(
			screen.getByText("SYSTEM_READY [ BACKEND_ENGINEER ]"),
		).toBeInTheDocument();
	});

	it("renders call to action buttons with correct route links", () => {
		render(<HeroSection />);
		const projectsLink = screen.getByText("View Backend Projects").closest("a");
		const contactLink = screen.getByText("Contact Me").closest("a");

		expect(projectsLink).toHaveAttribute("href", "/projects");
		expect(contactLink).toHaveAttribute("href", "/contact");
	});

	it("renders subcomponents in isolation", () => {
		const { unmount: unmountBadge } = render(<HeroBadge />);
		expect(
			screen.getByText("SYSTEM_READY [ BACKEND_ENGINEER ]"),
		).toBeInTheDocument();
		unmountBadge();

		const { unmount: unmountHeading } = render(<HeroHeading />);
		expect(screen.getByText("Hi, my name is")).toBeInTheDocument();
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			"VÍTOR PIRES.",
		);
		unmountHeading();

		const { unmount: unmountBio } = render(<HeroBio />);
		expect(
			screen.getByText(/I build resilient server-side architectures/i),
		).toBeInTheDocument();
		unmountBio();

		const { unmount: unmountActions } = render(<HeroActions />);
		expect(screen.getByText("View Backend Projects")).toBeInTheDocument();
		expect(screen.getByText("Contact Me")).toBeInTheDocument();
		unmountActions();
	});
});
