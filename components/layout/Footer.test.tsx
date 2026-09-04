import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer Component", () => {
	it("renders copyright with current year and system status", () => {
		render(<Footer />);
		const currentYear = new Date().getFullYear();
		expect(
			screen.getByText(new RegExp(`© ${currentYear} VÍTOR PIRES`)),
		).toBeInTheDocument();
		expect(screen.getByText("SYS_STATUS: OK")).toBeInTheDocument();
	});

	it("renders social links for GitHub, LinkedIn, and Email", () => {
		render(<Footer />);
		const githubLink = screen.getByText("GitHub").closest("a");
		const linkedinLink = screen.getByText("LinkedIn").closest("a");
		const emailLink = screen.getByText("Email").closest("a");

		expect(githubLink).toHaveAttribute("href", "https://github.com/v1tor2003");
		expect(linkedinLink).toHaveAttribute(
			"href",
			"https://linkedin.com/in/vitor-pires",
		);
		expect(emailLink).toHaveAttribute("href", "mailto:vitor.pr04@hotmail.com");
	});
});
