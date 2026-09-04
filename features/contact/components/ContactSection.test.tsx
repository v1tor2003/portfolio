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

	it("renders both channels and interactive terminal transmitter subcomponents", () => {
		render(<ContactSection />);

		expect(
			screen.getByText("[ DIRECT_COMMUNICATION_CHANNELS ]"),
		).toBeInTheDocument();
		expect(screen.getByText(/SYSTEM TERMINAL OS/i)).toBeInTheDocument();
		expect(screen.getByText("root@vitor-server:~#")).toBeInTheDocument();
		expect(screen.getByLabelText("Terminal Input")).toBeInTheDocument();
	});
});
