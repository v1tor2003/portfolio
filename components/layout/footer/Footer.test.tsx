import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer Component", () => {
	it("renders copyright with current year and system status", () => {
		render(<Footer />);
		const currentYear = new Date().getFullYear();
		expect(screen.getByText(`© ${currentYear}`)).toBeInTheDocument();
		expect(screen.getByText("SYS_STATUS: OK")).toBeInTheDocument();
	});
});
