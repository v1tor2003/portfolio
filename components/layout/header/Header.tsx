"use client";

import { useState } from "react";
import { DesktopNav } from "./DesktopNav";
import { MobileNavMenu, MobileNavToggle } from "./MobileNav";
import { NavBrand } from "./NavBrand";
import { NAV_ITEMS } from "./nav-data";
import { useActiveSection } from "./useActiveSection";

export function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const activeSection = useActiveSection(NAV_ITEMS);

	return (
		<header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-black/80 backdrop-blur-md font-mono text-sm">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<NavBrand onNavigate={() => setIsOpen(false)} />
				<DesktopNav items={NAV_ITEMS} activeSection={activeSection} />
				<MobileNavToggle
					isOpen={isOpen}
					onToggle={() => setIsOpen((prev) => !prev)}
				/>
			</div>

			<MobileNavMenu
				items={NAV_ITEMS}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
		</header>
	);
}
