import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MigrationSection } from "./MigrationSection";

describe("MigrationSection Component", () => {
	it("renders section title and description", () => {
		render(<MigrationSection />);
		expect(screen.getByText("Portfolio v2 Architecture")).toBeInTheDocument();
		expect(screen.getByText("04. MIGRATION JOURNEY")).toBeInTheDocument();
	});
});
