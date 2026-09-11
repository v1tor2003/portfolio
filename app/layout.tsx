import type { Metadata } from "next";
import { JetBrains_Mono, Share_Tech_Mono } from "next/font/google";
import { Footer, Header, PageTransition } from "@/components/layout";
import { BinaryMatrixCanvas } from "@/features/binary-animations/components/BinaryMatrixCanvas";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	display: "swap",
});

const shareTechMono = Share_Tech_Mono({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-digital",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Vítor Pires | Backend Software Engineer",
	description:
		"Backend Software Engineer specializing in server-side systems backed by cloud infrastructures",
	icons: {
		icon: [{ url: "/vp-logo.svg", type: "image/svg+xml" }],
		apple: "/vp-logo.svg",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`dark scroll-smooth ${jetbrainsMono.variable} ${shareTechMono.variable}`}
		>
			<body className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black antialiased relative">
				<BinaryMatrixCanvas
					opacity={0.25}
					fontSize={24}
					speedMultiplier={0.5}
				/>
				<div className="relative z-10 flex min-h-screen flex-col">
					<Header />
					<main className="flex-1 flex flex-col">
						<PageTransition>{children}</PageTransition>
					</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
