import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "./page";

describe("AboutPage Route", () => {
	it("renders about heading and core engineering highlights", () => {
		render(<AboutPage />);
		expect(
			screen.getByRole("heading", {
				level: 2,
				name: /Server-Side Engineering & Cloud Integration/i,
			}),
		).toBeInTheDocument();
		expect(screen.getByText(/01\. ABOUT ME/i)).toBeInTheDocument();
		expect(screen.getByText(/Backend Architecture/i)).toBeInTheDocument();
	});
});
