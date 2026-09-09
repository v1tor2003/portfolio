import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Project } from "../schemas/project.schema";
import { ProjectCard } from "./ProjectCard";

describe("ProjectCard Component", () => {
	const mockProject: Project = {
		id: "command-api",
		name: "@v1tor2003/command-api",
		description: "Lightweight command-based HTTP abstraction layer",
		category: "personal",
		htmlUrl: "https://github.com/v1tor2003/command-api",
		stars: 12,
		forks: 3,
		language: "TypeScript",
		topics: ["typescript", "http"],
		isPinned: true,
		hasReadme: true,
		owner: "v1tor2003",
		repo: "command-api",
	};

	it("renders project information and badges", () => {
		render(<ProjectCard project={mockProject} onViewReadme={() => {}} />);

		expect(screen.getByText("@v1tor2003/command-api")).toBeInTheDocument();
		expect(
			screen.getByText("Lightweight command-based HTTP abstraction layer"),
		).toBeInTheDocument();
		expect(screen.getByText("PINNED")).toBeInTheDocument();
		expect(screen.getByText("TypeScript")).toBeInTheDocument();
		expect(screen.getByText("12")).toBeInTheDocument();
		expect(screen.getByText("3")).toBeInTheDocument();
	});

	it("calls onViewReadme when README button is clicked", () => {
		const handleViewReadme = vi.fn();
		render(
			<ProjectCard project={mockProject} onViewReadme={handleViewReadme} />,
		);

		const readmeBtn = screen.getByRole("button", { name: /view readme/i });
		fireEvent.click(readmeBtn);

		expect(handleViewReadme).toHaveBeenCalledWith(mockProject);
	});

	it("calls onViewReadme when clicking anywhere on the card container", () => {
		const handleViewReadme = vi.fn();
		render(
			<ProjectCard project={mockProject} onViewReadme={handleViewReadme} />,
		);

		const card = screen.getByRole("button", {
			name: /view details and readme for @v1tor2003\/command-api/i,
		});
		fireEvent.click(card);

		expect(handleViewReadme).toHaveBeenCalledWith(mockProject);
	});
});
