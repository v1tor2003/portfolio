import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ResumePage from "./page";

describe("Resume Page (/resume)", () => {
	it("renders breadcrumb back link, download button, and preview launch trigger", () => {
		render(<ResumePage />);

		expect(
			screen.getByRole("link", { name: /back to portfolio/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: /download cv/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /preview resume/i }),
		).toBeInTheDocument();
		expect(screen.queryByTitle(/resume preview/i)).not.toBeInTheDocument();

		// Click to reveal preview
		fireEvent.click(screen.getByRole("button", { name: /preview resume/i }));
		expect(screen.getByTitle(/resume preview/i)).toBeInTheDocument();
	});
});
