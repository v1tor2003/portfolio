import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutSection } from "./AboutSection";

describe("AboutSection Component", () => {
	it("renders section title and bio text", () => {
		render(<AboutSection />);
		expect(
			screen.getByText("Server-Side Engineering & Cloud Integration"),
		).toBeInTheDocument();
	});

	it("renders core backend highlights cards", () => {
		render(<AboutSection />);
		expect(screen.getByText("Backend Architecture")).toBeInTheDocument();
		expect(screen.getByText("Cloud & Infrastructure")).toBeInTheDocument();
		expect(screen.getByText("Data & System Integrity")).toBeInTheDocument();
	});

	it("renders technical stack skills including AWS, DigitalOcean, and C#", () => {
		render(<AboutSection />);
		expect(screen.getByText("AWS")).toBeInTheDocument();
		expect(screen.getByText("DigitalOcean")).toBeInTheDocument();
		expect(screen.getByText("Railway")).toBeInTheDocument();
		expect(screen.getByText("C#")).toBeInTheDocument();
	});
});

