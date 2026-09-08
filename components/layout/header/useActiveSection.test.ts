import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useActiveSection } from "./useActiveSection";

const TEST_ITEMS = [
	{ label: "About", href: "#about" },
	{ label: "Projects", href: "#projects" },
];

describe("useActiveSection Hook", () => {
	beforeEach(() => {
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
	});

	it("detects active section on scroll", () => {
		Object.defineProperty(window, "scrollY", { value: 100, writable: true });

		const { result } = renderHook(() => useActiveSection(TEST_ITEMS));

		expect(result.current).toBe("#about");

		act(() => {
			Object.defineProperty(window, "scrollY", { value: 400, writable: true });
			window.dispatchEvent(new Event("scroll"));
		});

		expect(result.current).toBe("#projects");
	});
});
