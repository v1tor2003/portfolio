"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";

interface PageTransitionProps {
	children: ReactNode;
}

const MotionDiv = motion.div as React.ComponentType<{
	key?: string | null;
	initial?: Record<string, unknown> | boolean;
	animate?: Record<string, unknown>;
	transition?: Record<string, unknown>;
	className?: string;
	children?: ReactNode;
}>;

export function PageTransition({ children }: PageTransitionProps) {
	const pathname = usePathname();
	const isFirstMount = useRef(true);

	useEffect(() => {
		isFirstMount.current = false;
	}, []);

	return (
		<div className="w-full flex-1 flex flex-col">
			<MotionDiv
				key={pathname}
				initial={isFirstMount.current ? false : { opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.2, ease: "easeInOut" }}
				className="w-full flex-1"
			>
				{children}
			</MotionDiv>
		</div>
	);
}
