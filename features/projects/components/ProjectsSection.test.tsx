import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectsSection } from "./ProjectsSection";

describe("ProjectsSection Component", () => {
	it("renders section title and description", () => {
		render(<ProjectsSection />);
		expect(
			screen.getByText("Backend Open Source & Cloud Work"),
		).toBeInTheDocument();
		expect(screen.getByText("02. FEATURED PROJECTS")).toBeInTheDocument();
	});
});
