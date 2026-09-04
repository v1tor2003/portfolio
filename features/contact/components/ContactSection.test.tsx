import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactSection } from "./ContactSection";

describe("ContactSection Component", () => {
	it("renders contact section with heading and indicators", () => {
		const { container } = render(<ContactSection />);

		expect(container.querySelector("#contact")).toBeInTheDocument();
		expect(screen.getByText("05. GET IN TOUCH")).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: "Let's Connect" }),
		).toBeInTheDocument();
	});

	it("renders both channels and terminal transmitter subcomponents", () => {
		render(<ContactSection />);

		expect(
			screen.getByText("[ DIRECT_COMMUNICATION_CHANNELS ]"),
		).toBeInTheDocument();
		expect(
			screen.getByText("TERMINAL_TRANSMITTER [ TCP / PORT: 443 ]"),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /\[TRANSMIT_PACKET\]/i }),
		).toBeInTheDocument();
	});
});
