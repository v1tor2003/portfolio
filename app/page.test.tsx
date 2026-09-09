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

	it("renders navigation portal cards to dedicated subpages", () => {
		render(<HomePage />);

		expect(screen.getByText("01. ABOUT")).toBeInTheDocument();
		expect(screen.getByText("02. PROJECTS")).toBeInTheDocument();
		expect(screen.getByText("03. RESUME")).toBeInTheDocument();
		expect(screen.getByText("04. MIGRATION")).toBeInTheDocument();
		expect(screen.getByText("05. CONTACT")).toBeInTheDocument();

		expect(screen.getByText("01. ABOUT").closest("a")).toHaveAttribute(
			"href",
			"/about",
		);
		expect(screen.getByText("02. PROJECTS").closest("a")).toHaveAttribute(
			"href",
			"/projects",
		);
		expect(screen.getByText("03. RESUME").closest("a")).toHaveAttribute(
			"href",
			"/resume",
		);
		expect(screen.getByText("04. MIGRATION").closest("a")).toHaveAttribute(
			"href",
			"/migration",
		);
		expect(screen.getByText("05. CONTACT").closest("a")).toHaveAttribute(
			"href",
			"/contact",
		);
	});

	it("renders view projects and contact buttons", () => {
		render(<HomePage />);
		expect(screen.getByText("View Backend Projects")).toBeInTheDocument();
		expect(screen.getByText("Contact Me")).toBeInTheDocument();
	});
});
