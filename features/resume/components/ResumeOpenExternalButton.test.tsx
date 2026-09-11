import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResumeOpenExternalButton } from "./ResumeOpenExternalButton";

describe("ResumeOpenExternalButton Component", () => {
	it("renders open in new tab link with default locale (en)", () => {
		render(<ResumeOpenExternalButton />);

		const link = screen.getByRole("link", { name: /open in new tab/i });
		expect(link).toBeDefined();
		expect(link.getAttribute("href")).toBe("/api/resume?locale=en");
		expect(link.getAttribute("target")).toBe("_blank");
		expect(link.getAttribute("rel")).toContain("noopener");
	});

	it("renders open in new tab link for pt-BR locale", () => {
		render(<ResumeOpenExternalButton locale="pt-BR" />);

		const link = screen.getByRole("link", { name: /open in new tab/i });
		expect(link).toBeDefined();
		expect(link.getAttribute("href")).toBe("/api/resume?locale=pt-BR");
	});
});
