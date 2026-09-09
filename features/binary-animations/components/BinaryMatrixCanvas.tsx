"use client";

import { useEffect, useRef } from "react";

interface BinaryMatrixCanvasProps {
	opacity?: number;
	fontSize?: number;
	speedMultiplier?: number;
	color?: string;
	highlightColor?: string;
	characters?: readonly string[];
}

function normalizeRgb(colorStr: string): string {
	if (colorStr.startsWith("#")) {
		const cleanHex = colorStr.replace("#", "");
		const fullHex =
			cleanHex.length === 3
				? cleanHex
						.split("")
						.map((c) => c + c)
						.join("")
				: cleanHex;
		const num = parseInt(fullHex, 16);
		return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
	}
	return colorStr;
}

export function BinaryMatrixCanvas({
	opacity = 0.12,
	fontSize = 14,
	speedMultiplier = 1,
	color = "255, 255, 255",
	highlightColor = "255, 255, 255",
	characters = ["0", "1"],
}: BinaryMatrixCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animationFrameId: number;

		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		const columns = Math.floor(canvas.width / fontSize);
		const drops: number[] = Array.from({ length: columns }, () =>
			Math.floor(Math.random() * -100),
		);
		const baseRgb = normalizeRgb(color);
		const highRgb = normalizeRgb(highlightColor);

		const render = () => {
			ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.font = `${fontSize}px var(--font-mono), monospace`;

			for (let i = 0; i < drops.length; i++) {
				const char = characters[Math.floor(Math.random() * characters.length)];
				const x = i * fontSize;
				const y = drops[i] * fontSize;

				const isHighlight = Math.random() > 0.95;
				ctx.fillStyle = isHighlight
					? `rgba(${highRgb}, ${Math.min(1, opacity * 2.5)})`
					: `rgba(${baseRgb}, ${opacity})`;

				ctx.fillText(char, x, y);

				if (y > canvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}

				drops[i] += 0.5 * speedMultiplier;
			}

			animationFrameId = requestAnimationFrame(render);
		};

		render();

		return () => {
			window.removeEventListener("resize", handleResize);
			cancelAnimationFrame(animationFrameId);
		};
	}, [characters, color, fontSize, highlightColor, opacity, speedMultiplier]);

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 pointer-events-none z-0 opacity-70"
		/>
	);
}
