import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer Component", () => {
	it("renders minimal copyright with current year", () => {
		render(<Footer />);
		const currentYear = new Date().getFullYear();
		expect(screen.getByText(`© ${currentYear}`)).toBeInTheDocument();
	});
});
