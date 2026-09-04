import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactSection } from "./ContactSection";

describe("ContactSection Component", () => {
	it("renders contact section with heading and call to action", () => {
		const { container } = render(<ContactSection />);

		expect(container.querySelector("#contact")).toBeInTheDocument();
		expect(screen.getByText("05. GET IN TOUCH")).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: "Let's Connect" }),
		).toBeInTheDocument();
		expect(screen.getByRole("link", { name: /Say Hello/i })).toHaveAttribute(
			"href",
			"mailto:vitor.pr04@hotmail.com",
		);
	});
});
