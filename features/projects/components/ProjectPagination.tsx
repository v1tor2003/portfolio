"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectPaginationProps {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
}

export function ProjectPagination({
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	onPageChange,
}: ProjectPaginationProps) {
	if (totalPages <= 1) return null;

	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-800/80 font-mono">
			{/* Metadata line */}
			<div className="text-xs text-zinc-500 flex items-center gap-2">
				<span className="text-emerald-500/80">{"//"}</span>
				<span>
					SHOWING {startItem}–{endItem} OF {totalItems} REPOSITORIES
				</span>
				<span className="text-zinc-700">|</span>
				<span className="text-zinc-400">
					PAGE {currentPage} OF {totalPages}
				</span>
			</div>

			{/* Pagination Controls */}
			<nav aria-label="Projects pagination" className="flex items-center gap-2">
				<button
					type="button"
					aria-label="Previous page"
					disabled={currentPage === 1}
					onClick={() => onPageChange(currentPage - 1)}
					className="flex items-center gap-1 text-xs px-3 py-1.5 rounded border transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 active:scale-95"
				>
					<ChevronLeft className="w-3.5 h-3.5" />
					<span>PREV</span>
				</button>

				<div className="flex items-center gap-1.5">
					{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
						const isActive = page === currentPage;
						return (
							<button
								key={page}
								type="button"
								aria-label={`Page ${page}`}
								aria-current={isActive ? "page" : undefined}
								onClick={() => onPageChange(page)}
								className={cn(
									"w-8 h-8 rounded text-xs font-semibold flex items-center justify-center border transition-all duration-150",
									isActive
										? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
										: "bg-zinc-900/40 text-zinc-400 border-zinc-800/80 hover:text-white hover:border-zinc-700 hover:bg-zinc-800/60",
								)}
							>
								{page}
							</button>
						);
					})}
				</div>

				<button
					type="button"
					aria-label="Next page"
					disabled={currentPage === totalPages}
					onClick={() => onPageChange(currentPage + 1)}
					className="flex items-center gap-1 text-xs px-3 py-1.5 rounded border transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 active:scale-95"
				>
					<span>NEXT</span>
					<ChevronRight className="w-3.5 h-3.5" />
				</button>
			</nav>
		</div>
	);
}
