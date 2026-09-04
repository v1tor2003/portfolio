import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header Component", () => {
	it("renders brand logo with VÍTOR_PIRES", () => {
		render(<Header />);
		expect(screen.getByText("VÍTOR_PIRES")).toBeInTheDocument();
	});

	it("renders all navigation links", () => {
		render(<Header />);
		expect(screen.getByText("// 01. About")).toBeInTheDocument();
		expect(screen.getByText("// 02. Projects")).toBeInTheDocument();
		expect(screen.getByText("// 03. Resume")).toBeInTheDocument();
		expect(screen.getByText("// 04. Migration")).toBeInTheDocument();
		expect(screen.getByText("// 05. Contact")).toBeInTheDocument();
	});

	it("toggles mobile menu on button click", () => {
		render(<Header />);
		const toggleBtn = screen.getByLabelText("Toggle Navigation Menu");
		expect(toggleBtn).toBeInTheDocument();

		// Click to open mobile menu
		fireEvent.click(toggleBtn);
		const navElements = screen.getAllByText("// 01. About");
		expect(navElements.length).toBeGreaterThan(1);
	});
});
