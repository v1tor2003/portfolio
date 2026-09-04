import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GithubIcon, LinkedinIcon } from "./icons";

describe("icons components", () => {
	it("renders GithubIcon with custom size, color, and className", () => {
		const { container } = render(
			<GithubIcon
				size={24}
				color="#22c55e"
				className="custom-github"
				data-testid="github-icon"
			/>,
		);

		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
		expect(svg).toHaveAttribute("width", "24");
		expect(svg).toHaveAttribute("height", "24");
		expect(svg).toHaveAttribute("fill", "#22c55e");
		expect(svg).toHaveClass("custom-github");
	});

	it("renders LinkedinIcon with custom size, color, and className", () => {
		const { container } = render(
			<LinkedinIcon
				size={20}
				color="#a855f7"
				className="custom-linkedin"
				data-testid="linkedin-icon"
			/>,
		);

		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
		expect(svg).toHaveAttribute("width", "20");
		expect(svg).toHaveAttribute("height", "20");
		expect(svg).toHaveAttribute("fill", "#a855f7");
		expect(svg).toHaveClass("custom-linkedin");
	});
});
