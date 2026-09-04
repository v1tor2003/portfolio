import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MigrationMetricsCard } from "./MigrationMetricsCard";

describe("MigrationMetricsCard Component", () => {
	it("renders all key architectural metrics", () => {
		render(<MigrationMetricsCard />);

		expect(screen.getByText("BUNDLE ASSET SIZE")).toBeInTheDocument();
		expect(screen.getByText("-99.98%")).toBeInTheDocument();
		expect(screen.getByText("3.2 KB")).toBeInTheDocument();

		expect(screen.getByText("LEGACY PACKAGES")).toBeInTheDocument();
		expect(screen.getByText("0 vulnerabilities")).toBeInTheDocument();

		expect(screen.getByText("PRODUCTION BUILD")).toBeInTheDocument();
		expect(screen.getByText("130ms Turbopack")).toBeInTheDocument();

		expect(screen.getByText("CODE LINTING / CHECK")).toBeInTheDocument();
		expect(screen.getByText("6ms Biome")).toBeInTheDocument();
	});
});
