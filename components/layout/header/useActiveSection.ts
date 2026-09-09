"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavItem } from "./nav-data";

export function useActiveSection(
	navItems: readonly NavItem[],
	offset = 200,
): string {
	const pathname = usePathname();
	const [activeSection, setActiveSection] = useState("");

	useEffect(() => {
		if (pathname) {
			const matchingRoute = navItems.find((item) => {
				if (!item.href.startsWith("/")) return false;
				if (item.href === "/") return pathname === "/";
				return pathname === item.href || pathname.startsWith(`${item.href}/`);
			});

			if (matchingRoute) {
				setActiveSection(matchingRoute.href);
				return;
			}
		}

		const handleScroll = () => {
			const scrollPos = window.scrollY + offset;

			for (const item of navItems) {
				if (!item.href.startsWith("#")) continue;
				try {
					const section = document.querySelector(item.href);
					if (section instanceof HTMLElement) {
						const top = section.offsetTop;
						const height = section.offsetHeight;

						if (scrollPos >= top && scrollPos < top + height) {
							setActiveSection(item.href);
							break;
						}
					}
				} catch {
					// Ignore invalid selector
				}
			}
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [navItems, offset, pathname]);

	return activeSection;
}
