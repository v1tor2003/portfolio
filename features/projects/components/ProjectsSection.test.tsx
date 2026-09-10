import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { GitActivityData, Project } from "../schemas/project.schema";
import { ProjectsSection } from "./ProjectsSection";

describe("ProjectsSection Component", () => {
	const mockPersonalProject: Project = {
		id: "cmd-api",
		name: "@v1tor2003/command-api",
		description: "Personal command API",
		category: "personal",
		htmlUrl: "https://github.com/v1tor2003/command-api",
		stars: 10,
		forks: 1,
		language: "TypeScript",
		topics: ["typescript"],
		isPinned: true,
		hasReadme: true,
		owner: "v1tor2003",
		repo: "command-api",
	};

	const mockWorkProject: Project = {
		id: "ent-gw",
		name: "enterprise-gateway",
		description: "Enterprise event streaming gateway",
		category: "work",
		htmlUrl: "https://github.com/v1tor2003",
		stars: 0,
		forks: 0,
		language: "Go",
		topics: ["kafka"],
		isPinned: true,
		hasReadme: true,
		owner: "enterprise",
		repo: "gateway",
	};

	const mockActivity: GitActivityData = {
		days: [
			{ date: "2026-01-01", count: 3, category: "personal" },
			{ date: "2026-01-02", count: 7, category: "work" },
		],
		totalPersonal: 3,
		totalWork: 7,
	};

	it("renders section title with link to GitHub profile and description", () => {
		render(
			<ProjectsSection
				initialProjects={[mockPersonalProject, mockWorkProject]}
				initialActivity={mockActivity}
			/>,
		);
		const titleLink = screen.getByRole("link", {
			name: /featured github repositories/i,
		});
		expect(titleLink).toBeInTheDocument();
		expect(titleLink).toHaveAttribute("href", "https://github.com/v1tor2003");
		expect(titleLink).toHaveAttribute("target", "_blank");
		expect(titleLink).toHaveAttribute("rel", "noopener noreferrer");
		expect(screen.getByText("02. FEATURED PROJECTS")).toBeInTheDocument();
	});

	it("switches tabs between personal and work projects", () => {
		render(
			<ProjectsSection
				initialProjects={[mockPersonalProject, mockWorkProject]}
				initialActivity={mockActivity}
			/>,
		);

		// Personal project is visible by default
		expect(screen.getByText("@v1tor2003/command-api")).toBeInTheDocument();
		expect(screen.queryByText("enterprise-gateway")).not.toBeInTheDocument();

		// Switch to work tab
		const workTab = screen.getByText("// 02. WORK (ENTERPRISE CONTRIBUTIONS)");
		fireEvent.click(workTab);

		expect(screen.getByText("enterprise-gateway")).toBeInTheDocument();
		expect(
			screen.queryByText("@v1tor2003/command-api"),
		).not.toBeInTheDocument();
	});

	it("opens readme modal when readme button is clicked", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: true,
				json: async () => ({ content: "# command-api doc" }),
			}),
		);

		render(
			<ProjectsSection
				initialProjects={[mockPersonalProject]}
				initialActivity={mockActivity}
			/>,
		);

		const readmeBtn = screen.getByRole("button", { name: /view readme/i });
		fireEvent.click(readmeBtn);

		await waitFor(() => {
			expect(screen.getByText(/command-api\/README\.md/i)).toBeInTheDocument();
		});

		vi.unstubAllGlobals();
	});
});
