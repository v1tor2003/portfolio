"use client";

import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useEmailSender } from "../hooks/useEmailSender";
import { createDefaultCommandRegistry } from "./terminal-commands";
import type {
	ContactDraft,
	TerminalLine,
	TerminalState,
} from "./terminal.types";
import { WIZARD_STEPS } from "./wizard-steps";

const INITIAL_LINES: TerminalLine[] = [
	{
		id: "sys-1",
		type: "system",
		text: "SYSTEM TERMINAL OS [v2.6.0-release]",
	},
	{
		id: "sys-2",
		type: "system",
		text: "Type 'help' for commands.",
	},
];

const INITIAL_DRAFT: ContactDraft = {
	name: "",
	email: "",
	subject: "",
	message: "",
	botField: "",
};

export function useTerminal() {
	const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);
	const [inputValue, setInputValue] = useState("");
	const [state, setState] = useState<TerminalState>("IDLE");
	const [history, setHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState<number>(-1);
	const [draft, setDraft] = useState<ContactDraft>(INITIAL_DRAFT);
	const { sendEmail, isPending } = useEmailSender();

	const bufferRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const registry = useMemo(() => createDefaultCommandRegistry(), []);

	useEffect(() => {
		if (bufferRef.current) {
			bufferRef.current.scrollTop = bufferRef.current.scrollHeight;
		}
	}, [lines]);

	const addLine = useCallback(
		(type: TerminalLine["type"], text: string, prefix = "") => {
			setLines((prev) => [
				...prev,
				{
					id: `${Date.now()}-${Math.random()}`,
					type,
					text: prefix ? `${prefix} ${text}` : text,
				},
			]);
		},
		[],
	);

	const clearLines = useCallback(() => {
		setLines([]);
	}, []);

	const startWizard = useCallback(() => {
		setState("PROMPT_NAME");
		setDraft(INITIAL_DRAFT);
		addLine(
			"system",
			"--- INITIATING SECURE TRANSMISSION WIZARD (Type 'cancel' at any time) ---",
		);
		addLine("prompt", "[?] Enter your name:");
	}, [addLine]);

	const handleCommand = useCallback(
		(cmd: string) => {
			const trimmed = cmd.trim();
			if (!trimmed) return;

			setHistory((prev) => [trimmed, ...prev]);
			setHistoryIndex(-1);

			addLine("input", trimmed, "root@vitor-server:~#");

			const [main, ...args] = trimmed.split(/\s+/);
			const executed = registry.execute(main, {
				args,
				addLine,
				clearLines,
				startWizard,
				registry,
			});

			if (!executed) {
				addLine(
					"error",
					`command not found: '${trimmed}'. Type 'help' to see valid commands.`,
				);
			}
		},
		[addLine, clearLines, registry, startWizard],
	);

	const handleWizardInput = useCallback(
		(value: string) => {
			const trimmed = value.trim();

			if (
				trimmed.toLowerCase() === "cancel" ||
				trimmed.toLowerCase() === "exit"
			) {
				addLine("input", trimmed);
				addLine(
					"system",
					"[ABORTED] Transmission sequence terminated by user.",
				);
				setState("IDLE");
				return;
			}

			if (state in WIZARD_STEPS) {
				const step =
					WIZARD_STEPS[
						state as Extract<
							TerminalState,
							| "PROMPT_NAME"
							| "PROMPT_EMAIL"
							| "PROMPT_SUBJECT"
							| "PROMPT_MESSAGE"
						>
					];

				addLine("input", trimmed, step.inputLabel);
				const check = step.validate(trimmed);

				if (!check.success) {
					addLine("error", `Error: ${check.error}`);
					if (state === "PROMPT_NAME")
						addLine("prompt", "[?] Enter your name:");
					if (state === "PROMPT_EMAIL")
						addLine("prompt", "[?] Enter your email address:");
					if (state === "PROMPT_SUBJECT")
						addLine("prompt", "[?] Enter subject of inquiry:");
					if (state === "PROMPT_MESSAGE")
						addLine(
							"prompt",
							"[?] Enter message payload (min 10 characters):",
						);
					return;
				}

				setDraft((prev) => ({ ...prev, [step.field]: trimmed }));
				setState(step.nextState);
				addLine("prompt", step.nextPrompt);
				return;
			}

			if (state === "PROMPT_CONFIRM") {
				addLine("input", trimmed, "confirm [Y/n] >");
				const choice = trimmed.toLowerCase();
				if (choice === "n" || choice === "no") {
					addLine("system", "[ABORTED] Packet discarded.");
					setState("IDLE");
					return;
				}

				setState("TRANSMITTING");
				addLine("system", "[TRANSMITTING] Encrypting packet via TLS_1.3...");

				sendEmail(draft).then((res) => {
					if (res.success) {
						addLine(
							"success",
							`[STATUS: 200 OK] ${res.message || "Packet delivered successfully!"}`,
						);
						addLine(
							"system",
							"Transmission complete. Thank you for reaching out!",
						);
					} else {
						addLine(
							"error",
							`[STATUS: 400] ${res.message || "Failed to dispatch transmission."}`,
						);
					}
					setState("IDLE");
				});
			}
		},
		[addLine, draft, sendEmail, state],
	);

	const handleSubmit = useCallback(
		(e: React.FormEvent | React.SubmitEvent) => {
			e.preventDefault();
			if (isPending) return;

			const current = inputValue;
			setInputValue("");

			if (state === "IDLE") {
				handleCommand(current);
			} else {
				handleWizardInput(current);
			}
		},
		[handleCommand, handleWizardInput, inputValue, isPending, state],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (state !== "IDLE") return;

			if (e.key === "ArrowUp") {
				e.preventDefault();
				if (history.length === 0) return;
				const nextIndex = Math.min(historyIndex + 1, history.length - 1);
				setHistoryIndex(nextIndex);
				setInputValue(history[nextIndex] || "");
			} else if (e.key === "ArrowDown") {
				e.preventDefault();
				if (historyIndex > 0) {
					const nextIndex = historyIndex - 1;
					setHistoryIndex(nextIndex);
					setInputValue(history[nextIndex] || "");
				} else if (historyIndex === 0) {
					setHistoryIndex(-1);
					setInputValue("");
				}
			}
		},
		[history, historyIndex, state],
	);

	const focusInput = useCallback(() => {
		inputRef.current?.focus();
	}, []);

	return {
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
	};
}

