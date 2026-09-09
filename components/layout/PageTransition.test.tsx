import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PageTransition } from "./PageTransition";

const mockUsePathname = vi.fn();
vi.mock("next/navigation", () => ({
	usePathname: () => mockUsePathname(),
}));

describe("PageTransition Component", () => {
	it("renders child content within motion container", () => {
		mockUsePathname.mockReturnValue("/about");

		render(
			<PageTransition>
				<div data-testid="page-content">About Page Content</div>
			</PageTransition>,
		);

		expect(screen.getByTestId("page-content")).toBeInTheDocument();
		expect(screen.getByText("About Page Content")).toBeInTheDocument();
	});

	it("updates when pathname changes", async () => {
		mockUsePathname.mockReturnValue("/projects");

		const { rerender } = render(
			<PageTransition>
				<div data-testid="page-content">Projects Page</div>
			</PageTransition>,
		);

		expect(screen.getByText("Projects Page")).toBeInTheDocument();

		mockUsePathname.mockReturnValue("/migration");
		await act(async () => {
			rerender(
				<PageTransition>
					<div data-testid="page-content">Migration Page</div>
				</PageTransition>,
			);
		});

		await vi.waitFor(() => {
			expect(screen.getByText("Migration Page")).toBeInTheDocument();
		});
	});
});
