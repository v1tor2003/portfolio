import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutHeader } from "./AboutHeader";
import { AboutSection } from "./AboutSection";
import { CoreHighlights } from "./CoreHighlights";
import { TechStackGrid } from "./TechStackGrid";

describe("About Feature Components", () => {
	describe("AboutSection", () => {
		it("renders section badge, title and bio text", () => {
			render(<AboutSection />);
			expect(screen.getByText("01. ABOUT ME")).toBeInTheDocument();
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

	describe("AboutHeader", () => {
		it("renders the section badge and introductory paragraph", () => {
			render(<AboutHeader />);
			expect(screen.getByText("01. ABOUT ME")).toBeInTheDocument();
			expect(
				screen.getByText(/Backend Software Engineer specializing/i),
			).toBeInTheDocument();
		});
	});

	describe("CoreHighlights", () => {
		it("renders default highlight cards", () => {
			render(<CoreHighlights />);
			expect(screen.getByText("Backend Architecture")).toBeInTheDocument();
			expect(screen.getByText("Cloud & Infrastructure")).toBeInTheDocument();
			expect(screen.getByText("Data & System Integrity")).toBeInTheDocument();
		});
	});

	describe("TechStackGrid", () => {
		it("renders header and skill group titles", () => {
			render(<TechStackGrid />);
			expect(
				screen.getByText("TECHNICAL STACK & CLOUD ECOSYSTEM"),
			).toBeInTheDocument();
			expect(screen.getByText("// BACKEND & LANGUAGES")).toBeInTheDocument();
			expect(screen.getByText("// CLOUD & INFRASTRUCTURE")).toBeInTheDocument();
			expect(
				screen.getByText("// DATABASES & ARCHITECTURE"),
			).toBeInTheDocument();
		});
	});
});
