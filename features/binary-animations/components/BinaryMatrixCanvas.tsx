"use client";

import { useEffect, useRef } from "react";

interface BinaryMatrixCanvasProps {
	opacity?: number;
	fontSize?: number;
	speedMultiplier?: number;
}

export function BinaryMatrixCanvas({
	opacity = 0.12,
	fontSize = 14,
	speedMultiplier = 1,
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
		const binaryChars = ["0", "1"];

		const render = () => {
			// Semi-transparent fade effect for trail effect
			ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.font = `${fontSize}px var(--font-mono), monospace`;

			for (let i = 0; i < drops.length; i++) {
				const char =
					binaryChars[Math.floor(Math.random() * binaryChars.length)];
				const x = i * fontSize;
				const y = drops[i] * fontSize;

				// Vary character brightness subtly
				const isHighlight = Math.random() > 0.95;
				ctx.fillStyle = isHighlight
					? `rgba(255, 255, 255, ${opacity * 2})`
					: `rgba(255, 255, 255, ${opacity})`;

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
	}, [fontSize, opacity, speedMultiplier]);

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 pointer-events-none z-0 opacity-70"
		/>
	);
}
