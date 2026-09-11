import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WorkProjectsDisclaimer } from "./WorkProjectsDisclaimer";

describe("WorkProjectsDisclaimer Component", () => {
	it("renders the confidentiality badge, heading, and explanation text", () => {
		render(<WorkProjectsDisclaimer />);

		expect(
			screen.getByText(/RESTRICTED ACCESS \/\/ ARCHITECTURAL REFERENCE/i),
		).toBeInTheDocument();
		expect(
			screen.getByRole("heading", {
				name: /Enterprise Architecture & Reference Implementations/i,
			}),
		).toBeInTheDocument();
		expect(screen.getByText(/confidentiality/i)).toBeInTheDocument();
		expect(
			screen.getByText(/architecture-equivalent reference implementations/i),
		).toBeInTheDocument();
	});
});
