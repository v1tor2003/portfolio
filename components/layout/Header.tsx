"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
	{ label: "// 01. About", href: "#about" },
	{ label: "// 02. Projects", href: "#projects" },
	{ label: "// 03. Resume", href: "#resume" },
	{ label: "// 04. Migration", href: "#migration" },
	{ label: "// 05. Contact", href: "#contact" },
];

export function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("");

	useEffect(() => {
		const handleScroll = () => {
			const sections = NAV_ITEMS.map((item) =>
				document.querySelector(item.href),
			);
			const scrollPos = window.scrollY + 200;

			for (const section of sections) {
				if (section instanceof HTMLElement) {
					const top = section.offsetTop;
					const height = section.offsetHeight;

					if (scrollPos >= top && scrollPos < top + height) {
						setActiveSection(`#${section.id}`);
						break;
					}
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-black/80 backdrop-blur-md font-mono text-sm">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link
					href="/"
					className="group flex items-center space-x-2 text-white transition-colors hover:text-zinc-400"
				>
					<span className="text-zinc-500 font-bold">[</span>
					<span className="tracking-wider font-semibold">VÍTOR_PIRES</span>
					<span className="text-zinc-500 font-bold">]</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex md:items-center md:space-x-6">
					{NAV_ITEMS.map((item) => {
						const isActive = activeSection === item.href;
						return (
							<a
								key={item.href}
								href={item.href}
								className={`transition-colors hover:text-white ${
									isActive ? "text-white font-semibold" : "text-zinc-400"
								}`}
							>
								{item.label}
							</a>
						);
					})}
				</nav>

				{/* Mobile Menu Toggle */}
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className="p-2 text-zinc-400 hover:text-white md:hidden"
					aria-label="Toggle Navigation Menu"
				>
					{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
				</button>
			</div>

			{/* Mobile Dropdown */}
			{isOpen && (
				<nav className="border-b border-zinc-800 bg-zinc-950 px-4 py-4 md:hidden">
					<div className="flex flex-col space-y-4 font-mono">
						{NAV_ITEMS.map((item) => (
							<a
								key={item.href}
								href={item.href}
								onClick={() => setIsOpen(false)}
								className="text-zinc-400 hover:text-white"
							>
								{item.label}
							</a>
						))}
					</div>
				</nav>
			)}
		</header>
	);
}
