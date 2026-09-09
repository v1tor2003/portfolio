"use client";

import { useMemo, useState } from "react";
import type {
	GitActivityData,
	GitActivityDay,
	ProjectCategory,
} from "../schemas/project.schema";

interface GitActivityGraphProps {
	activity: GitActivityData;
	activeCategory: ProjectCategory;
}

export function GitActivityGraph({
	activity,
	activeCategory,
}: GitActivityGraphProps) {
	const [hoveredDay, setHoveredDay] = useState<GitActivityDay | null>(null);

	// Group days into columns of 7 days (weeks)
	const weeks = useMemo(() => {
		const result: GitActivityDay[][] = [];
		let currentWeek: GitActivityDay[] = [];

		for (const day of activity.days) {
			currentWeek.push(day);
			if (currentWeek.length === 7) {
				result.push(currentWeek);
				currentWeek = [];
			}
		}

		if (currentWeek.length > 0) {
			result.push(currentWeek);
		}

		return result;
	}, [activity.days]);

	const getCellAppearance = (day: GitActivityDay) => {
		const isPersonalActive = activeCategory === "personal";

		if (day.count === 0 || day.category === "none") {
			return {
				bg: "bg-zinc-900 border-zinc-800/60",
				highlight: "none",
			};
		}

		if (isPersonalActive) {
			if (day.category === "personal" || day.category === "mixed") {
				// Cyberpunk Emerald Green
				if (day.count > 6) {
					return {
						bg: "bg-emerald-400 border-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.5)]",
						highlight: "personal",
					};
				}
				if (day.count > 3) {
					return {
						bg: "bg-emerald-500 border-emerald-400",
						highlight: "personal",
					};
				}
				return {
					bg: "bg-emerald-600/80 border-emerald-500/60",
					highlight: "personal",
				};
			}
			// Dimmed work activity in personal mode
			return {
				bg: "bg-zinc-800 border-zinc-700/50",
				highlight: "dimmed",
			};
		}

		// isWorkActive
		if (day.category === "work" || day.category === "mixed") {
			// Electric Purple
			if (day.count > 8) {
				return {
					bg: "bg-purple-400 border-purple-300 shadow-[0_0_8px_rgba(192,132,252,0.5)]",
					highlight: "work",
				};
			}
			if (day.count > 4) {
				return {
					bg: "bg-purple-500 border-purple-400",
					highlight: "work",
				};
			}
			return {
				bg: "bg-purple-600/80 border-purple-500/60",
				highlight: "work",
			};
		}
		// Dimmed personal activity in work mode
		return {
			bg: "bg-zinc-800 border-zinc-700/50",
			highlight: "dimmed",
		};
	};

	return (
		<div className="w-full bg-black/40 border border-zinc-800 rounded-lg p-4 sm:p-5 font-mono space-y-4 backdrop-blur-sm">
			{/* Header metrics */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
				<div className="flex items-center space-x-2 text-xs text-zinc-400">
					<span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
					<span className="font-semibold tracking-wider text-zinc-300">
						{"// ACTIVITY MATRIX"}
					</span>
				</div>

				<div className="flex items-center gap-4 text-xs">
					<div
						className={`flex items-center gap-1.5 transition-colors ${
							activeCategory === "personal"
								? "text-emerald-400 font-semibold"
								: "text-zinc-500"
						}`}
					>
						<span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
						<span>Personal: {activity.totalPersonal} commits</span>
					</div>

					<div
						className={`flex items-center gap-1.5 transition-colors ${
							activeCategory === "work"
								? "text-purple-400 font-semibold"
								: "text-zinc-500"
						}`}
					>
						<span className="w-2.5 h-2.5 rounded-sm bg-purple-500 inline-block" />
						<span>Enterprise: {activity.totalWork} commits</span>
					</div>
				</div>
			</div>

			{/* Matrix grid view with horizontal scrolling */}
			<div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
				<div className="inline-flex gap-1">
					{weeks.map((week, wIdx) => (
						<div key={`week-${wIdx}`} className="flex flex-col gap-1">
							{week.map((day) => {
								const { bg, highlight } = getCellAppearance(day);
								return (
									<button
										key={day.date}
										type="button"
										aria-label={`${day.date}: ${day.count} commits`}
										data-highlight={highlight}
										onMouseEnter={() => setHoveredDay(day)}
										onMouseLeave={() => setHoveredDay(null)}
										className={`w-3 h-3 rounded-[2px] border transition-all duration-150 hover:scale-125 hover:z-10 ${bg}`}
									/>
								);
							})}
						</div>
					))}
				</div>
			</div>

			{/* Footer tooltip and legend */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-zinc-500 pt-1">
				<div className="min-h-[16px]">
					{hoveredDay ? (
						<span>
							<strong className="text-zinc-300">{hoveredDay.date}</strong>:{" "}
							{hoveredDay.count} commits (
							<span
								className={
									hoveredDay.category === "personal"
										? "text-emerald-400"
										: hoveredDay.category === "work"
											? "text-purple-400"
											: "text-zinc-400"
								}
							>
								{hoveredDay.category}
							</span>
							)
						</span>
					) : (
						<span>Hover over grid cells for commit details</span>
					)}
				</div>

				<div className="flex items-center gap-1.5 self-end sm:self-auto">
					<span>Less</span>
					<span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-900 border border-zinc-800" />
					<span
						className={`w-2.5 h-2.5 rounded-[2px] border ${
							activeCategory === "personal"
								? "bg-emerald-600/80 border-emerald-500/60"
								: "bg-purple-600/80 border-purple-500/60"
						}`}
					/>
					<span
						className={`w-2.5 h-2.5 rounded-[2px] border ${
							activeCategory === "personal"
								? "bg-emerald-500 border-emerald-400"
								: "bg-purple-500 border-purple-400"
						}`}
					/>
					<span
						className={`w-2.5 h-2.5 rounded-[2px] border ${
							activeCategory === "personal"
								? "bg-emerald-400 border-emerald-300"
								: "bg-purple-400 border-purple-300"
						}`}
					/>
					<span>More</span>
				</div>
			</div>
		</div>
	);
}
