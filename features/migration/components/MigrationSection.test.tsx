import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MigrationSection } from "./MigrationSection";

describe("MigrationSection Component", () => {
	it("renders migration section heading and indicators", () => {
		const { container } = render(<MigrationSection />);

		expect(container.querySelector("#migration")).toBeInTheDocument();
		expect(screen.getByText("04. MIGRATION JOURNEY")).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: "Portfolio v2 Architecture" }),
		).toBeInTheDocument();
	});

	it("renders architectural benchmarks and timeline subcomponents", () => {
		render(<MigrationSection />);

		expect(
			screen.getByText("[ ARCHITECTURAL BENCHMARKS & METRICS ]"),
		).toBeInTheDocument();
		expect(
			screen.getByText("[ MIGRATION TIMELINE & ENGINEERING MILESTONES ]"),
		).toBeInTheDocument();
		expect(screen.getByText("BUNDLE ASSET SIZE")).toBeInTheDocument();
		expect(screen.getByText("[PHASE_01]")).toBeInTheDocument();
	});
});
