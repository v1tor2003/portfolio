import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage Component", () => {
	it("renders homepage main title and backend engineer role", () => {
		render(<HomePage />);
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			"VÍTOR PIRES.",
		);
		expect(screen.getByText("Backend Software Engineer.")).toBeInTheDocument();
	});

	it("renders all single-page scroll sections", () => {
		const { container } = render(<HomePage />);

		expect(container.querySelector("#hero")).toBeInTheDocument();
		expect(container.querySelector("#about")).toBeInTheDocument();
		expect(container.querySelector("#projects")).toBeInTheDocument();
		expect(container.querySelector("#resume")).toBeInTheDocument();
		expect(container.querySelector("#migration")).toBeInTheDocument();
		expect(container.querySelector("#contact")).toBeInTheDocument();
	});

	it("renders view projects and contact buttons", () => {
		render(<HomePage />);
		expect(screen.getByText("View Backend Projects")).toBeInTheDocument();
		expect(screen.getByText("Contact Me")).toBeInTheDocument();
	});
});
