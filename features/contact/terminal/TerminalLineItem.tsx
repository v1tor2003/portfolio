import type { TerminalLine } from "./terminal.types";

interface TerminalLineItemProps {
	line: TerminalLine;
}

export function TerminalLineItem({ line }: TerminalLineItemProps) {
	let lineStyle = "text-zinc-300";
	if (line.type === "system") lineStyle = "text-zinc-500 italic";
	if (line.type === "input") lineStyle = "text-white font-bold";
	if (line.type === "error") lineStyle = "text-rose-400";
	if (line.type === "success") lineStyle = "text-emerald-400 font-semibold";
	if (line.type === "prompt") lineStyle = "text-amber-300 font-semibold";

	return <div className={`${lineStyle} whitespace-pre-wrap`}>{line.text}</div>;
}

