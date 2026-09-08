export interface TerminalLine {
	id: string;
	type: "system" | "input" | "output" | "error" | "success" | "prompt";
	text: string;
}

export type TerminalState =
	| "IDLE"
	| "PROMPT_NAME"
	| "PROMPT_EMAIL"
	| "PROMPT_SUBJECT"
	| "PROMPT_MESSAGE"
	| "PROMPT_CONFIRM"
	| "TRANSMITTING";

export interface ContactDraft {
	name: string;
	email: string;
	subject: string;
	message: string;
	botField: string;
}

