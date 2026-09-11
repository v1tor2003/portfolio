import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResumeViewer } from "./ResumeViewer";

describe("ResumeViewer Component", () => {
	it("renders preview trigger button by default and does not mount iframe immediately", () => {
		render(<ResumeViewer />);

		expect(
			screen.getByRole("button", { name: /preview resume/i }),
		).toBeInTheDocument();
		expect(screen.queryByTitle(/resume preview/i)).not.toBeInTheDocument();
	});

	it("opens the iframe preview when preview button is clicked and allows closing it", () => {
		render(<ResumeViewer />);

		const previewBtn = screen.getByRole("button", { name: /preview resume/i });
		fireEvent.click(previewBtn);

		const iframe = screen.getByTitle(/resume preview/i);
		expect(iframe).toBeInTheDocument();
		expect(iframe.getAttribute("src")).toBe("/api/resume?locale=en");

		const closeBtn = screen.getByRole("button", { name: /close preview/i });
		fireEvent.click(closeBtn);

		expect(screen.queryByTitle(/resume preview/i)).not.toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /preview resume/i }),
		).toBeInTheDocument();
	});

	it("renders preview directly when initialOpen is true", () => {
		render(<ResumeViewer initialOpen={true} />);

		const iframe = screen.getByTitle(/resume preview/i);
		expect(iframe).toBeInTheDocument();
		expect(iframe.getAttribute("src")).toBe("/api/resume?locale=en");

		const newTabLink = screen.getByRole("link", { name: /open in new tab/i });
		expect(newTabLink).toBeInTheDocument();
		expect(newTabLink.getAttribute("href")).toBe("/api/resume?locale=en");
	});

	it("switches locale to PT-BR and updates file name, iframe, and download target", () => {
		render(<ResumeViewer initialOpen={true} />);

		expect(screen.getByText("vitor-pires-resume-en.pdf")).toBeInTheDocument();

		const ptBrBtn = screen.getByRole("button", { name: "PT-BR" });
		fireEvent.click(ptBrBtn);

		expect(
			screen.getByText("vitor-pires-resume-pt-BR.pdf"),
		).toBeInTheDocument();

		const iframe = screen.getByTitle(/resume preview/i);
		expect(iframe.getAttribute("src")).toBe("/api/resume?locale=pt-BR");

		const downloadLink = screen.getByRole("link", { name: /download cv/i });
		expect(downloadLink.getAttribute("href")).toBe(
			"/api/resume?locale=pt-BR&download=true",
		);
		expect(downloadLink.getAttribute("download")).toBe(
			"vitor-pires-resume-pt-BR.pdf",
		);
	});
});
