import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactChannels } from "./ContactChannels";

describe("ContactChannels Component", () => {
	it("renders direct contact channel links and metadata", () => {
		render(<ContactChannels />);

		expect(
			screen.getByText("[ DIRECT_COMMUNICATION_CHANNELS ]"),
		).toBeInTheDocument();
		expect(screen.getByText("vitor.pr04@hotmail.com")).toBeInTheDocument();
		expect(screen.getByText("linkedin.com/in/vitor-pires")).toBeInTheDocument();
		expect(screen.getByText("github.com/v1tor2003")).toBeInTheDocument();
		expect(
			screen.getByText("LOCATION: São Paulo, Brazil [UTC-3]"),
		).toBeInTheDocument();
	});

	it("has valid href attributes on links", () => {
		render(<ContactChannels />);

		const emailLink = screen.getByRole("link", {
			name: /vitor\.pr04@hotmail\.com/i,
		});
		expect(emailLink).toHaveAttribute("href", "mailto:vitor.pr04@hotmail.com");

		const githubLink = screen.getByRole("link", {
			name: /github\.com\/v1tor2003/i,
		});
		expect(githubLink).toHaveAttribute("href", "https://github.com/v1tor2003");
	});
});
