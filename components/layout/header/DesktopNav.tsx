import Link from "next/link";
import type { NavItem } from "./nav-data";

interface DesktopNavProps {
	items: readonly NavItem[];
	activeSection: string;
}

export function DesktopNav({ items, activeSection }: DesktopNavProps) {
	return (
		<nav
			aria-label="Desktop Navigation"
			className="hidden md:flex md:items-center md:space-x-6"
		>
			{items.map((item) => {
				const isActive = activeSection === item.href;
				return (
					<Link
						key={item.href}
						href={item.href}
						className={`transition-colors hover:text-white ${
							isActive ? "text-white font-semibold" : "text-zinc-400"
						}`}
					>
						{item.label}
					</Link>
				);
			})}
		</nav>
	);
}
