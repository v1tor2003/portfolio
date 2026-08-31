import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Vítor Pires - Portfolio",
	description: "Portfolio of Vítor Pires",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
