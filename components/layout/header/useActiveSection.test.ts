import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useActiveSection } from "./useActiveSection";

const mockUsePathname = vi.fn();
vi.mock("next/navigation", () => ({
	usePathname: () => mockUsePathname(),
}));

const TEST_SCROLL_ITEMS = [
	{ label: "About", href: "#about" },
	{ label: "Projects", href: "#projects" },
];

const TEST_ROUTE_ITEMS = [
	{ label: "About", href: "/about" },
	{ label: "Projects", href: "/projects" },
	{ label: "Migration", href: "/migration" },
];

describe("useActiveSection Hook", () => {
	beforeEach(() => {
		mockUsePathname.mockReturnValue("/");
		document.body.innerHTML = `
			<div id="about">About Section</div>
			<div id="projects">Projects Section</div>
		`;
		const about = document.getElementById("about");
		const projects = document.getElementById("projects");

		if (about) {
			Object.defineProperty(about, "offsetTop", {
				value: 0,
				writable: true,
			});
			Object.defineProperty(about, "offsetHeight", {
				value: 500,
				writable: true,
			});
		}
		if (projects) {
			Object.defineProperty(projects, "offsetTop", {
				value: 500,
				writable: true,
			});
			Object.defineProperty(projects, "offsetHeight", {
				value: 500,
				writable: true,
			});
		}
	});

	afterEach(() => {
		document.body.innerHTML = "";
		vi.clearAllMocks();
	});

	it("detects active section on scroll for anchor items", () => {
		Object.defineProperty(window, "scrollY", { value: 100, writable: true });

		const { result } = renderHook(() => useActiveSection(TEST_SCROLL_ITEMS));

		expect(result.current).toBe("#about");

		act(() => {
			Object.defineProperty(window, "scrollY", { value: 400, writable: true });
			window.dispatchEvent(new Event("scroll"));
		});

		expect(result.current).toBe("#projects");
	});

	it("detects active section based on current pathname", () => {
		mockUsePathname.mockReturnValue("/projects");

		const { result } = renderHook(() => useActiveSection(TEST_ROUTE_ITEMS));

		expect(result.current).toBe("/projects");
	});

	it("detects active section for nested route paths", () => {
		mockUsePathname.mockReturnValue("/about/team");

		const { result } = renderHook(() => useActiveSection(TEST_ROUTE_ITEMS));

		expect(result.current).toBe("/about");
	});
});
