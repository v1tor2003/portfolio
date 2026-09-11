import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactHeader } from "./ContactHeader";
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

		expect(screen.getByText(/SYSTEM TERMINAL OS/i)).toBeInTheDocument();
		expect(screen.getByText("root@vitor-server:~#")).toBeInTheDocument();
		expect(screen.getByLabelText("Terminal Input")).toBeInTheDocument();
	});

	it("renders ContactHeader in isolation", () => {
		render(<ContactHeader />);
		expect(screen.getByText("05. GET IN TOUCH")).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: "Let's Connect" }),
		).toBeInTheDocument();
		expect(
			screen.getByText(/Have a backend architecture, integration/i),
		).toBeInTheDocument();
	});
});
