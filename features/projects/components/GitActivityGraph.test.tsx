import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { GitActivityData } from "../schemas/project.schema";
import { GitActivityGraph } from "./GitActivityGraph";

describe("GitActivityGraph Component", () => {
	const mockActivity: GitActivityData = {
		days: [
			{ date: "2026-03-01", count: 4, category: "personal" },
			{ date: "2026-03-02", count: 8, category: "work" },
			{ date: "2026-03-03", count: 0, category: "none" },
		],
		totalPersonal: 4,
		totalWork: 8,
	};

	it("renders total personal and work stats", () => {
		render(
			<GitActivityGraph activity={mockActivity} activeCategory="personal" />,
		);

		expect(screen.getByText(/Personal: 4 commits/i)).toBeInTheDocument();
		expect(screen.getByText(/Enterprise: 8 commits/i)).toBeInTheDocument();
	});

	it("highlights personal activity in personal mode", () => {
		const { container } = render(
			<GitActivityGraph activity={mockActivity} activeCategory="personal" />,
		);

		// Personal day should have emerald/green color class
		const greenCells = container.querySelectorAll(
			"[data-highlight='personal']",
		);
		expect(greenCells.length).toBeGreaterThanOrEqual(1);
	});

	it("highlights work activity in work mode", () => {
		const { container } = render(
			<GitActivityGraph activity={mockActivity} activeCategory="work" />,
		);

		// Work day should have purple color class
		const purpleCells = container.querySelectorAll("[data-highlight='work']");
		expect(purpleCells.length).toBeGreaterThanOrEqual(1);
	});
});
