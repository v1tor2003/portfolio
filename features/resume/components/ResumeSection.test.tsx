import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResumeSection } from "./ResumeSection";

describe("ResumeSection Component", () => {
	it("renders section title and description", () => {
		render(<ResumeSection />);
		expect(screen.getByText("Curriculum Vitae")).toBeInTheDocument();
		expect(screen.getByText("03. RESUME SYNC")).toBeInTheDocument();
	});

	it("renders download button and preview link", () => {
		render(<ResumeSection />);
		expect(
			screen.getByRole("link", { name: /download cv/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: /preview online/i }),
		).toBeInTheDocument();
	});
});
