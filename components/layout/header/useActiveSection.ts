"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "./nav-data";

export function useActiveSection(
	navItems: readonly NavItem[],
	offset = 200,
): string {
	const [activeSection, setActiveSection] = useState("");

	useEffect(() => {
		const handleScroll = () => {
			const scrollPos = window.scrollY + offset;

			for (const item of navItems) {
				const section = document.querySelector(item.href);
				if (section instanceof HTMLElement) {
					const top = section.offsetTop;
					const height = section.offsetHeight;

					if (scrollPos >= top && scrollPos < top + height) {
						setActiveSection(item.href);
						break;
					}
				}
			}
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [navItems, offset]);

	return activeSection;
}
