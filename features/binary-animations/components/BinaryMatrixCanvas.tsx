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

const DEFAULT_CHARACTERS = ["0", "1"] as const;

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
	characters = DEFAULT_CHARACTERS,
}: BinaryMatrixCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animationFrameId: number;
		let columns = 0;
		let drops: number[] = [];

		const baseRgb = normalizeRgb(color);
		const highRgb = normalizeRgb(highlightColor);

		const initDimensions = () => {
			const width =
				window.innerWidth || document.documentElement.clientWidth || 300;
			const height =
				window.innerHeight || document.documentElement.clientHeight || 150;
			canvas.width = width;
			canvas.height = height;
			columns = Math.floor(width / fontSize);
			const totalRows = Math.max(1, Math.floor(height / fontSize));
			drops = Array.from({ length: columns }, () =>
				Math.floor(Math.random() * totalRows),
			);
		};

		initDimensions();
		window.addEventListener("resize", initDimensions);

		const stepDrops = () => {
			ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

			for (let i = 0; i < drops.length; i++) {
				const char = characters[Math.floor(Math.random() * characters.length)];
				const x = i * fontSize;
				const y = drops[i] * fontSize;

				const isHighlight = Math.random() > 0.95;
				ctx.fillStyle = isHighlight
					? `rgba(${highRgb}, ${Math.min(1, opacity * 2.5)})`
					: `rgba(${baseRgb}, ${opacity})`;

				ctx.fillText(char, x, y);

				if (y > canvas.height) {
					if (Math.random() > 0.975 || y > canvas.height + 100) {
						drops[i] = 0;
					}
				}

				drops[i] += 0.5 * speedMultiplier;
			}
		};

		// Pre-warm the canvas with trails so bit rain is visible immediately on first load
		for (let s = 0; s < 40; s++) {
			ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			stepDrops();
		}

		const render = () => {
			ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			stepDrops();

			animationFrameId = requestAnimationFrame(render);
		};

		render();

		return () => {
			window.removeEventListener("resize", initDimensions);
			cancelAnimationFrame(animationFrameId);
		};
	}, [
		color,
		fontSize,
		highlightColor,
		opacity,
		speedMultiplier,
		Array.isArray(characters) ? characters.join(",") : characters,
	]);

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 pointer-events-none z-0 opacity-70"
		/>
	);
}
