import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProjectTabs } from "./ProjectTabs";

describe("ProjectTabs Component", () => {
	it("renders both tab buttons with exact specification labels", () => {
		render(<ProjectTabs activeTab="personal" onTabChange={() => {}} />);

		expect(screen.getByText("// 01. PERSONAL")).toBeInTheDocument();
		expect(
			screen.getByText("// 02. WORK (ENTERPRISE CONTRIBUTIONS)"),
		).toBeInTheDocument();
	});

	it("calls onTabChange when a tab is clicked", () => {
		const handleTabChange = vi.fn();
		render(<ProjectTabs activeTab="personal" onTabChange={handleTabChange} />);

		const workTab = screen.getByText("// 02. WORK (ENTERPRISE CONTRIBUTIONS)");
		fireEvent.click(workTab);

		expect(handleTabChange).toHaveBeenCalledWith("work");
	});
});
