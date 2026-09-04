import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MigrationTimeline } from "./MigrationTimeline";

describe("MigrationTimeline Component", () => {
	it("renders all migration phases with key architectural decisions", () => {
		render(<MigrationTimeline />);

		expect(screen.getByText("[PHASE_01]")).toBeInTheDocument();
		expect(
			screen.getByText("Legacy Deconstruction & Tech Debt Eradication"),
		).toBeInTheDocument();

		expect(screen.getByText("[PHASE_02]")).toBeInTheDocument();
		expect(
			screen.getByText("Next.js 16 App Router & Full-Stack Primitives"),
		).toBeInTheDocument();

		expect(screen.getByText("[PHASE_03]")).toBeInTheDocument();
		expect(
			screen.getByText("High-Speed Tooling: Biome & Vitest"),
		).toBeInTheDocument();

		expect(screen.getByText("[PHASE_04]")).toBeInTheDocument();
		expect(
			screen.getByText("60fps HTML5 Binary Matrix Engine"),
		).toBeInTheDocument();

		expect(screen.getByText("[PHASE_05]")).toBeInTheDocument();
		expect(
			screen.getByText("Feature Encapsulation & Bulletproof Architecture"),
		).toBeInTheDocument();
	});

	it("renders technical tags for phases", () => {
		render(<MigrationTimeline />);

		expect(screen.getByText("Next.js 16")).toBeInTheDocument();
		expect(screen.getByText("Turbopack")).toBeInTheDocument();
		expect(screen.getByText("TypeScript 7")).toBeInTheDocument();
		expect(screen.getByText("HTML5 Canvas 2D")).toBeInTheDocument();
	});
});
