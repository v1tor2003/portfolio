import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResumeDownloadButton } from "./ResumeDownloadButton";

describe("ResumeDownloadButton Component", () => {
	it("renders download link with correct attributes", () => {
		render(<ResumeDownloadButton />);

		const link = screen.getByRole("link", { name: /download cv/i });
		expect(link).toBeDefined();
		expect(link.getAttribute("href")).toBe("/api/resume?download=true");
		expect(link.getAttribute("download")).toBe("vitor-pires-resume.pdf");
	});
});
