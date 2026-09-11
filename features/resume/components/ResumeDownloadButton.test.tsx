import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResumeDownloadButton } from "./ResumeDownloadButton";

describe("ResumeDownloadButton Component", () => {
	it("renders download link with correct attributes", () => {
		render(<ResumeDownloadButton />);

		const link = screen.getByRole("link", { name: /download cv/i });
		expect(link).toBeDefined();
		expect(link.getAttribute("href")).toBe(
			"/api/resume?locale=en&download=true",
		);
		expect(link.getAttribute("download")).toBe("vitor-pires-resume-en.pdf");
	});

	it("renders download link for pt-BR locale", () => {
		render(<ResumeDownloadButton locale="pt-BR" />);

		const link = screen.getByRole("link", { name: /download cv/i });
		expect(link).toBeDefined();
		expect(link.getAttribute("href")).toBe(
			"/api/resume?locale=pt-BR&download=true",
		);
		expect(link.getAttribute("download")).toBe("vitor-pires-resume-pt-BR.pdf");
	});
});
