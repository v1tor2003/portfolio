import { Menu, X } from "lucide-react";
import Link from "next/link";
import type { NavItem } from "./nav-data";

interface MobileNavToggleProps {
	isOpen: boolean;
	onToggle: () => void;
}

export function MobileNavToggle({ isOpen, onToggle }: MobileNavToggleProps) {
	return (
		<button
			type="button"
			onClick={onToggle}
			className="p-2 text-zinc-400 hover:text-white md:hidden"
			aria-label="Toggle Navigation Menu"
			aria-expanded={isOpen}
		>
			{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
		</button>
	);
}

interface MobileNavMenuProps {
	items: readonly NavItem[];
	isOpen: boolean;
	onClose: () => void;
}

export function MobileNavMenu({ items, isOpen, onClose }: MobileNavMenuProps) {
	if (!isOpen) return null;

	return (
		<nav
			aria-label="Mobile Navigation"
			className="border-b border-zinc-800 bg-zinc-950 px-4 py-4 md:hidden"
		>
			<div className="flex flex-col space-y-4 font-mono">
				{items.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						onClick={onClose}
						className="text-zinc-400 hover:text-white transition-colors"
					>
						{item.label}
					</Link>
				))}
			</div>
		</nav>
	);
}
