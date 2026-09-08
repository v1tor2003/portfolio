"use client";

import { TerminalHeader } from "./TerminalHeader";
import { TerminalInputForm } from "./TerminalInputForm";
import { TerminalLineItem } from "./TerminalLineItem";
import { useTerminal } from "./useTerminal";

export function ContactTerminal() {
	const {
		lines,
		inputValue,
		setInputValue,
		state,
		isPending,
		bufferRef,
		inputRef,
		handleSubmit,
		handleKeyDown,
		focusInput,
	} = useTerminal();

	return (
		<section
			className="rounded-lg border border-zinc-800 bg-black/95 font-mono shadow-2xl overflow-hidden cursor-text flex flex-col h-[320px]"
			onClick={focusInput}
			onKeyDown={(e) => {
				if (e.target === e.currentTarget) focusInput();
			}}
			aria-label="Interactive Terminal"
		>
			<TerminalHeader />

			<div
				ref={bufferRef}
				className="terminal-scrollbar flex-1 p-4 sm:p-5 text-xs sm:text-sm overflow-y-auto space-y-2"
			>
				{lines.map((line) => (
					<TerminalLineItem key={line.id} line={line} />
				))}

				<TerminalInputForm
					state={state}
					inputValue={inputValue}
					isPending={isPending}
					inputRef={inputRef}
					onChange={setInputValue}
					onSubmit={handleSubmit}
					onKeyDown={handleKeyDown}
				/>
			</div>
		</section>
	);
}

