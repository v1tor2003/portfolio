"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface PageTransitionProps {
	children: ReactNode;
}

const MotionDiv = motion.div as React.ComponentType<{
	key?: string | null;
	initial?: Record<string, unknown>;
	animate?: Record<string, unknown>;
	exit?: Record<string, unknown>;
	transition?: Record<string, unknown>;
	className?: string;
	children?: ReactNode;
}>;

export function PageTransition({ children }: PageTransitionProps) {
	const pathname = usePathname();

	return (
		<div className="w-full flex-1 flex flex-col">
			<AnimatePresence mode="wait" initial={false}>
				<MotionDiv
					key={pathname}
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -8 }}
					transition={{ duration: 0.2, ease: "easeInOut" }}
					className="w-full flex-1"
				>
					{children}
				</MotionDiv>
			</AnimatePresence>
		</div>
	);
}
