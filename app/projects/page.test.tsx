import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectsLoading from "./loading";
import ProjectsPage from "./page";

describe("ProjectsPage Route", () => {
	it("renders projects section heading and projects summary", async () => {
		const page = await ProjectsPage();
		render(page);

		expect(screen.getByText(/BACK TO HOME/i)).toBeInTheDocument();
		expect(
			screen.getByRole("heading", {
				level: 2,
				name: /Featured Github Repositories/i,
			}),
		).toBeInTheDocument();
		expect(screen.getByText(/02\. FEATURED PROJECTS/i)).toBeInTheDocument();
		expect(screen.getByText(/Personal:/i)).toBeInTheDocument();
	});

	it("renders immediate loading skeleton on route navigation", () => {
		render(<ProjectsLoading />);

		expect(screen.getByText(/BACK TO HOME/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/loading projects/i)).toBeInTheDocument();
		expect(screen.getByText(/02\. FEATURED PROJECTS/i)).toBeInTheDocument();
	});
});
