import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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

	const generateManyProjects = (count: number): Project[] => {
		return Array.from({ length: count }, (_, i) => ({
			id: `repo-${i + 1}`,
			name: `Repository ${i + 1}`,
			description: `Description for repo ${i + 1}`,
			category: "personal",
			htmlUrl: `https://github.com/v1tor2003/repo-${i + 1}`,
			stars: i,
			forks: 0,
			language: "TypeScript",
			topics: ["ts"],
			isPinned: false,
			hasReadme: true,
			owner: "v1tor2003",
			repo: `repo-${i + 1}`,
		}));
	};

	it("renders all projects in grid when count is 9 or less", () => {
		render(<ProjectGrid projects={mockProjects} onViewReadme={() => {}} />);

		expect(screen.getByText("Project One")).toBeInTheDocument();
		expect(screen.getByText("Project Two")).toBeInTheDocument();
		expect(
			screen.queryByRole("navigation", { name: /pagination/i }),
		).not.toBeInTheDocument();
	});

	it("renders empty state when no projects are provided", () => {
		render(<ProjectGrid projects={[]} onViewReadme={() => {}} />);

		expect(screen.getByText(/NO REPOSITORIES FOUND/i)).toBeInTheDocument();
	});

	it("paginates items at 9 per page and allows navigation", () => {
		const fifteenProjects = generateManyProjects(15);
		render(<ProjectGrid projects={fifteenProjects} onViewReadme={() => {}} />);

		// Page 1 should show repositories 1 to 9
		expect(screen.getByText("Repository 1")).toBeInTheDocument();
		expect(screen.getByText("Repository 9")).toBeInTheDocument();
		expect(screen.queryByText("Repository 10")).not.toBeInTheDocument();

		// Check pagination controls
		const paginationNav = screen.getByRole("navigation", {
			name: /pagination/i,
		});
		expect(paginationNav).toBeInTheDocument();

		const prevButton = screen.getByRole("button", { name: /previous page/i });
		const nextButton = screen.getByRole("button", { name: /next page/i });
		expect(prevButton).toBeDisabled();
		expect(nextButton).not.toBeDisabled();

		// Navigate to Page 2
		fireEvent.click(nextButton);

		// Page 2 should show repositories 10 to 15
		expect(screen.queryByText("Repository 1")).not.toBeInTheDocument();
		expect(screen.getByText("Repository 10")).toBeInTheDocument();
		expect(screen.getByText("Repository 15")).toBeInTheDocument();
		expect(prevButton).not.toBeDisabled();
		expect(nextButton).toBeDisabled();

		// Navigate back via page number button "1"
		const page1Button = screen.getByRole("button", { name: "Page 1" });
		fireEvent.click(page1Button);

		expect(screen.getByText("Repository 1")).toBeInTheDocument();
		expect(screen.queryByText("Repository 10")).not.toBeInTheDocument();
	});

	it("resets to page 1 when projects prop changes", () => {
		const fifteenProjects = generateManyProjects(15);
		const { rerender } = render(
			<ProjectGrid projects={fifteenProjects} onViewReadme={() => {}} />,
		);

		// Move to page 2
		const nextButton = screen.getByRole("button", { name: /next page/i });
		fireEvent.click(nextButton);
		expect(screen.getByText("Repository 10")).toBeInTheDocument();

		// Rerender with different projects
		const otherProjects = generateManyProjects(12).map((p) => ({
			...p,
			id: `alt-${p.id}`,
			name: `Alt ${p.name}`,
		}));
		rerender(<ProjectGrid projects={otherProjects} onViewReadme={() => {}} />);

		// Should reset to page 1
		expect(screen.getByText("Alt Repository 1")).toBeInTheDocument();
		expect(screen.queryByText("Alt Repository 10")).not.toBeInTheDocument();
	});

	it("fetches page 2 on-demand when not available in initial slice", async () => {
		const initialPage = generateManyProjects(9);
		const secondPage = generateManyProjects(18).slice(9, 18);

		const fetchMock = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				projects: secondPage,
				total: 18,
				page: 2,
				limit: 9,
				totalPages: 2,
			}),
		});
		vi.stubGlobal("fetch", fetchMock);

		render(
			<ProjectGrid
				projects={initialPage}
				totalItems={18}
				onViewReadme={() => {}}
			/>,
		);

		expect(screen.getByText("Repository 1")).toBeInTheDocument();

		const nextButton = screen.getByRole("button", { name: /next page/i });
		fireEvent.click(nextButton);

		await waitFor(() => {
			expect(fetchMock).toHaveBeenCalledWith(
				"/api/projects?category=personal&page=2&limit=9",
			);
			expect(screen.getByText("Repository 10")).toBeInTheDocument();
		});

		vi.unstubAllGlobals();
	});
});
