import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContactPage from "./page";

describe("ContactPage Route", () => {
	it("renders contact channels and terminal interface", () => {
		render(<ContactPage />);
		expect(
			screen.getByRole("heading", {
				level: 2,
				name: /Let's Connect/i,
			}),
		).toBeInTheDocument();
		expect(screen.getByText(/05\. GET IN TOUCH/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Interactive Terminal/i)).toBeInTheDocument();
	});
});
