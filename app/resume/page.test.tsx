import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ResumePage from "./page";

describe("Resume Page (/resume)", () => {
	it("renders breadcrumb back link, download button, and resume viewer", () => {
		render(<ResumePage />);

		expect(
			screen.getByRole("link", { name: /back to portfolio/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: /download cv/i }),
		).toBeInTheDocument();
		expect(screen.getByTitle(/resume preview/i)).toBeInTheDocument();
	});
});
