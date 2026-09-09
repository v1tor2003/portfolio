import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectsPage from "./page";

describe("ProjectsPage Route", () => {
	it("renders projects section heading and projects summary", async () => {
		const page = await ProjectsPage();
		render(page);

		expect(
			screen.getByRole("heading", {
				level: 2,
				name: /Backend Open Source & Cloud Work/i,
			}),
		).toBeInTheDocument();
		expect(screen.getByText(/02\. FEATURED PROJECTS/i)).toBeInTheDocument();
		expect(screen.getByText(/ACTIVITY MATRIX/i)).toBeInTheDocument();
	});
});
