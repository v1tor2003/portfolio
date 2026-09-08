import type React from "react";
import type { TerminalState } from "../types/terminal.types";

interface TerminalInputFormProps {
	state: TerminalState;
	inputValue: string;
	isPending: boolean;
	inputRef: React.RefObject<HTMLInputElement | null>;
	onChange: (value: string) => void;
	onSubmit: (e: React.FormEvent) => void;
	onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function TerminalInputForm({
	state,
	inputValue,
	isPending,
	inputRef,
	onChange,
	onSubmit,
	onKeyDown,
}: TerminalInputFormProps) {
	const getPromptLabel = () => {
		switch (state) {
			case "PROMPT_NAME":
				return "name >";
			case "PROMPT_EMAIL":
				return "email >";
			case "PROMPT_SUBJECT":
				return "subject >";
			case "PROMPT_MESSAGE":
				return "message >";
			case "PROMPT_CONFIRM":
				return "confirm [Y/n] >";
			case "TRANSMITTING":
				return "transmitting...";
			default:
				return "root@vitor-server:~#";
		}
	};

	return (
		<form onSubmit={onSubmit} className="flex items-center space-x-2 pt-1">
			<span
				className={`shrink-0 font-bold ${
					state === "IDLE" ? "text-emerald-400" : "text-amber-400"
				}`}
			>
				{getPromptLabel()}
			</span>

			<div className="relative flex-1 flex items-center">
				<input
					ref={inputRef}
					type="text"
					value={inputValue}
					onChange={(e) => onChange(e.target.value)}
					onKeyDown={onKeyDown}
					disabled={state === "TRANSMITTING" || isPending}
					className="w-full bg-transparent text-white focus:outline-none caret-white"
					spellCheck={false}
					autoComplete="off"
					aria-label="Terminal Input"
				/>
			</div>
		</form>
	);
}
