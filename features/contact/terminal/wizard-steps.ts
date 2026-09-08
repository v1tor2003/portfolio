import { contactSchema } from "../schemas/contact.schema";
import type { ContactDraft, TerminalState } from "./terminal.types";

export interface WizardStepDefinition {
	state: TerminalState;
	inputLabel: string;
	field: keyof ContactDraft;
	validate: (value: string) => { success: boolean; error?: string };
	nextState: TerminalState;
	nextPrompt: string;
}

export const WIZARD_STEPS: Record<
	Extract<
		TerminalState,
		"PROMPT_NAME" | "PROMPT_EMAIL" | "PROMPT_SUBJECT" | "PROMPT_MESSAGE"
	>,
	WizardStepDefinition
> = {
	PROMPT_NAME: {
		state: "PROMPT_NAME",
		inputLabel: "name >",
		field: "name",
		validate: (val) => {
			const res = contactSchema.shape.name.safeParse(val);
			return res.success
				? { success: true }
				: { success: false, error: res.error.issues[0]?.message };
		},
		nextState: "PROMPT_EMAIL",
		nextPrompt: "[?] Enter your email address:",
	},
	PROMPT_EMAIL: {
		state: "PROMPT_EMAIL",
		inputLabel: "email >",
		field: "email",
		validate: (val) => {
			const res = contactSchema.shape.email.safeParse(val);
			return res.success
				? { success: true }
				: { success: false, error: res.error.issues[0]?.message };
		},
		nextState: "PROMPT_SUBJECT",
		nextPrompt: "[?] Enter subject of inquiry:",
	},
	PROMPT_SUBJECT: {
		state: "PROMPT_SUBJECT",
		inputLabel: "subject >",
		field: "subject",
		validate: (val) => {
			const res = contactSchema.shape.subject.safeParse(val);
			return res.success
				? { success: true }
				: { success: false, error: res.error.issues[0]?.message };
		},
		nextState: "PROMPT_MESSAGE",
		nextPrompt: "[?] Enter message payload (min 10 characters):",
	},
	PROMPT_MESSAGE: {
		state: "PROMPT_MESSAGE",
		inputLabel: "message >",
		field: "message",
		validate: (val) => {
			const res = contactSchema.shape.message.safeParse(val);
			return res.success
				? { success: true }
				: { success: false, error: res.error.issues[0]?.message };
		},
		nextState: "PROMPT_CONFIRM",
		nextPrompt: "[?] Transmit packet to server gateway now? [Y/n]:",
	},
};
