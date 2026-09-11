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
				screen.getByText(
					"Server-Side Engineering, Distributed Systems & Software Craftsmanship",
				),
			).toBeInTheDocument();
		});

		it("renders core backend highlights cards", () => {
			render(<AboutSection />);
			expect(screen.getByText("B.S. in Computer Science")).toBeInTheDocument();
			expect(
				screen.getByText("SOLID, Clean & DDD Architecture"),
			).toBeInTheDocument();
			expect(screen.getByText("TDD & Agile Delivery")).toBeInTheDocument();
			expect(screen.getByText("Backend & Cloud Systems")).toBeInTheDocument();
		});

		it("renders technical stack skills including AWS, C#, and Docker", () => {
			render(<AboutSection />);
			expect(screen.getAllByText(/AWS/i).length).toBeGreaterThanOrEqual(1);
			expect(screen.getAllByText(/C#/i).length).toBeGreaterThanOrEqual(1);
			expect(screen.getAllByText(/Docker/i).length).toBeGreaterThanOrEqual(1);
			expect(screen.getAllByText(/SOLID/i).length).toBeGreaterThanOrEqual(1);
			expect(
				screen.getAllByText(/Clean Architecture/i).length,
			).toBeGreaterThanOrEqual(1);
			expect(screen.getAllByText(/TDD/i).length).toBeGreaterThanOrEqual(1);
		});
	});

	describe("AboutHeader", () => {
		it("renders the section badge and comprehensive bio information", () => {
			render(<AboutHeader />);
			expect(screen.getByText("01. ABOUT ME")).toBeInTheDocument();
			expect(
				screen.getByText(
					"Server-Side Engineering, Distributed Systems & Software Craftsmanship",
				),
			).toBeInTheDocument();
			expect(
				screen.getByText(/Backend Software Engineer/i),
			).toBeInTheDocument();
			expect(
				screen.getByText(/Universidade Estadual de Santa Cruz \(UESC\)/i),
			).toBeInTheDocument();
			expect(screen.getByText(/Agile and Scrum/i)).toBeInTheDocument();
			expect(screen.getByText(/SOLID principles/i)).toBeInTheDocument();
			expect(screen.getByText(/Clean Architecture/i)).toBeInTheDocument();
			expect(
				screen.getByText(/Domain-Driven Design \(DDD\)/i),
			).toBeInTheDocument();
			expect(
				screen.getByText(/Test-Driven Development \(TDD\)/i),
			).toBeInTheDocument();
		});
	});

	describe("CoreHighlights", () => {
		it("renders default highlight cards", () => {
			render(<CoreHighlights />);
			expect(screen.getByText("B.S. in Computer Science")).toBeInTheDocument();
			expect(
				screen.getByText("SOLID, Clean & DDD Architecture"),
			).toBeInTheDocument();
			expect(screen.getByText("TDD & Agile Delivery")).toBeInTheDocument();
			expect(screen.getByText("Backend & Cloud Systems")).toBeInTheDocument();
		});
	});

	describe("TechStackGrid", () => {
		it("renders header and skill group titles", () => {
			render(<TechStackGrid />);
			expect(
				screen.getByText("TECHNICAL STACK & ARCHITECTURAL ECOSYSTEM"),
			).toBeInTheDocument();
			expect(
				screen.getByText("// ARCHITECTURE & METHODOLOGIES"),
			).toBeInTheDocument();
			expect(screen.getByText("// BACKEND & LANGUAGES")).toBeInTheDocument();
			expect(screen.getByText("// CLOUD & INFRASTRUCTURE")).toBeInTheDocument();
			expect(screen.getByText("// DATABASES & STORAGE")).toBeInTheDocument();
		});
	});
});
