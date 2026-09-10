import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ResumePage from "./page";

describe("Resume Page (/resume)", () => {
	it("renders breadcrumb back link, section heading, download button, and preview", () => {
		render(<ResumePage />);

		expect(
			screen.getByRole("link", { name: /back to home/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("heading", {
				level: 2,
				name: /Curriculum Vitae/i,
			}),
		).toBeInTheDocument();
		expect(screen.getByText(/03\. RESUME SYNC/i)).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: /download cv/i }),
		).toBeInTheDocument();
		expect(screen.getByTitle(/resume preview/i)).toBeInTheDocument();
	});
});
