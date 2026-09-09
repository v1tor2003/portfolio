import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Project } from "../schemas/project.schema";
import { ProjectGrid } from "./ProjectGrid";

describe("ProjectGrid Component", () => {
	const mockProjects: Project[] = [
		{
			id: "project-1",
			name: "Project One",
			description: "First test project",
			category: "personal",
			htmlUrl: "https://github.com/v1tor2003/project-1",
			stars: 5,
			forks: 1,
			language: "TypeScript",
			topics: ["ts"],
			isPinned: true,
			hasReadme: true,
			owner: "v1tor2003",
			repo: "project-1",
		},
		{
			id: "project-2",
			name: "Project Two",
			description: "Second test project",
			category: "personal",
			htmlUrl: "https://github.com/v1tor2003/project-2",
			stars: 2,
			forks: 0,
			language: "Go",
			topics: ["go"],
			isPinned: false,
			hasReadme: true,
			owner: "v1tor2003",
			repo: "project-2",
		},
	];

	it("renders all projects in grid", () => {
		render(<ProjectGrid projects={mockProjects} onViewReadme={() => {}} />);

		expect(screen.getByText("Project One")).toBeInTheDocument();
		expect(screen.getByText("Project Two")).toBeInTheDocument();
	});

	it("renders empty state when no projects are provided", () => {
		render(<ProjectGrid projects={[]} onViewReadme={() => {}} />);

		expect(screen.getByText(/NO REPOSITORIES FOUND/i)).toBeInTheDocument();
	});
});
