import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MigrationPage from "./page";

describe("MigrationPage Route", () => {
	it("renders migration journey heading and timeline milestones", () => {
		render(<MigrationPage />);
		expect(
			screen.getByRole("heading", {
				level: 2,
				name: /Portfolio v2 Architecture/i,
			}),
		).toBeInTheDocument();
		expect(
			screen.getByText(/ARCHITECTURAL BENCHMARKS & METRICS/i),
		).toBeInTheDocument();
	});
});
