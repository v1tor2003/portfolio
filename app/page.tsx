"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HomePage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-black text-white selection:bg-white selection:text-black">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="max-w-2xl space-y-6"
			>
				<div className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
					[ 01010110 01001001 01010100 01001111 01010010 ]
				</div>
				<h1 className="text-5xl font-extrabold tracking-tight font-mono">
					Vítor Pires
				</h1>
				<p className="text-neutral-400 text-lg">
					Portfolio 2026 Update • Binary Theme Architecture
				</p>

				<div className="flex justify-center gap-4 pt-4">
					<Button variant="default" size="lg">
						Explore Portfolio
					</Button>
					<Button variant="outline" size="lg">
						View Resume
					</Button>
				</div>
			</motion.div>
		</main>
	);
}
