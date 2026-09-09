import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResumeViewer } from "./ResumeViewer";

describe("ResumeViewer Component", () => {
	it("renders the preview window with iframe pointing to /api/resume", () => {
		render(<ResumeViewer />);

		const iframe = screen.getByTitle(/resume preview/i);
		expect(iframe).toBeDefined();
		expect(iframe.getAttribute("src")).toBe("/api/resume");

		const newTabLink = screen.getByRole("link", { name: /open in new tab/i });
		expect(newTabLink).toBeDefined();
		expect(newTabLink.getAttribute("href")).toBe("/api/resume");
	});
});
