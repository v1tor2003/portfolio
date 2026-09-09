export interface NavItem {
	label: string;
	href: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
	{ label: "// 01. About", href: "/about" },
	{ label: "// 02. Projects", href: "/projects" },
	{ label: "// 03. Resume", href: "/resume" },
	{ label: "// 04. Migration", href: "/migration" },
	{ label: "// 05. Contact", href: "/contact" },
];
