import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectsSkeleton } from "./ProjectsSkeleton";

describe("ProjectsSkeleton Component", () => {
	it("renders loading skeleton with accessible aria label and structure", () => {
		render(<ProjectsSkeleton />);

		expect(screen.getByLabelText(/loading projects/i)).toBeInTheDocument();
		expect(screen.getByText(/02\. FEATURED PROJECTS/i)).toBeInTheDocument();
		expect(screen.getByText(/SYNCHRONIZING/i)).toBeInTheDocument();
	});
});
