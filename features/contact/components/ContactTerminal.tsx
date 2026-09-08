"use client";

import { useEffect, useRef, useState } from "react";
import { useEmailSender } from "../hooks/useEmailSender";
import { contactSchema } from "../schemas/contact.schema";
import type {
	ContactDraft,
	TerminalLine,
	TerminalState,
} from "../types/terminal.types";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalInputForm } from "./TerminalInputForm";
import { TerminalLineItem } from "./TerminalLineItem";

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

export function ContactTerminal() {
	const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);
	const [inputValue, setInputValue] = useState("");
	const [state, setState] = useState<TerminalState>("IDLE");
	const [history, setHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState<number>(-1);
	const [draft, setDraft] = useState<ContactDraft>(INITIAL_DRAFT);
	const { sendEmail, isPending } = useEmailSender();

	const bufferRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (bufferRef.current) {
			bufferRef.current.scrollTop = bufferRef.current.scrollHeight;
		}
	}, [lines]);

	const addLine = (type: TerminalLine["type"], text: string, prefix = "") => {
		setLines((prev) => [
			...prev,
			{
				id: `${Date.now()}-${Math.random()}`,
				type,
				text: prefix ? `${prefix} ${text}` : text,
			},
		]);
	};

	const handleCommand = (cmd: string) => {
		const trimmed = cmd.trim();
		if (!trimmed) return;

		setHistory((prev) => [trimmed, ...prev]);
		setHistoryIndex(-1);

		addLine("input", trimmed, "root@vitor-server:~#");

		const args = trimmed.toLowerCase().split(" ");
		const main = args[0];

		switch (main) {
			case "help":
				addLine(
					"output",
					`AVAILABLE COMMANDS:
  connect    - Initiate interactive message packet transmission
  skills     - List core backend, cloud & architecture stack
  bio        - View backend software engineering background
  socials    - Display direct channels (Email, LinkedIn, GitHub)
  clear      - Clear the terminal screen`,
				);
				break;

			case "skills":
				addLine(
					"output",
					`TECH STACK MATRIX:
  [BACKEND & LANGUAGES]   C#, .NET, Node.js, TypeScript, Go, REST APIs
  [CLOUD & INFRASTRUCTURE] AWS, DigitalOcean, Railway, Linux VPS, Docker, CI/CD
  [DATABASES & SYSTEM]    PostgreSQL, Redis, Microservices, Distributed Systems`,
				);
				break;

			case "bio":
				addLine(
					"output",
					`ENGINEER PROFILE:
  Name:     Vítor Pires
  Role:     Backend Software Engineer
  Mission:  Building resilient server-side microservices, high-throughput APIs and reliable cloud infrastructure.`,
				);
				break;

			case "socials":
				addLine(
					"output",
					`CHANNELS:
  Email:    vitor.pr04@hotmail.com
  LinkedIn: https://linkedin.com/in/pires-vitor
  GitHub:   https://github.com/v1tor2003`,
				);
				break;

			case "clear":
				setLines([]);
				break;

			case "connect":
			case "contact":
			case "send":
			case "mail":
				setState("PROMPT_NAME");
				setDraft(INITIAL_DRAFT);
				addLine(
					"system",
					"--- INITIATING SECURE TRANSMISSION WIZARD (Type 'cancel' at any time) ---",
				);
				addLine("prompt", "[?] Enter your name:");
				break;

			default:
				addLine(
					"error",
					`command not found: '${trimmed}'. Type 'help' to see valid commands.`,
				);
		}
	};

	const handleWizardInput = (value: string) => {
		const trimmed = value.trim();

		if (
			trimmed.toLowerCase() === "cancel" ||
			trimmed.toLowerCase() === "exit"
		) {
			addLine("input", trimmed);
			addLine("system", "[ABORTED] Transmission sequence terminated by user.");
			setState("IDLE");
			return;
		}

		switch (state) {
			case "PROMPT_NAME": {
				addLine("input", trimmed, "name >");
				const check = contactSchema.shape.name.safeParse(trimmed);
				if (!check.success) {
					addLine("error", `Error: ${check.error.issues[0].message}`);
					addLine("prompt", "[?] Enter your name:");
					return;
				}
				setDraft((prev) => ({ ...prev, name: trimmed }));
				setState("PROMPT_EMAIL");
				addLine("prompt", "[?] Enter your email address:");
				break;
			}

			case "PROMPT_EMAIL": {
				addLine("input", trimmed, "email >");
				const check = contactSchema.shape.email.safeParse(trimmed);
				if (!check.success) {
					addLine("error", `Error: ${check.error.issues[0].message}`);
					addLine("prompt", "[?] Enter your email address:");
					return;
				}
				setDraft((prev) => ({ ...prev, email: trimmed }));
				setState("PROMPT_SUBJECT");
				addLine("prompt", "[?] Enter subject of inquiry:");
				break;
			}

			case "PROMPT_SUBJECT": {
				addLine("input", trimmed, "subject >");
				const check = contactSchema.shape.subject.safeParse(trimmed);
				if (!check.success) {
					addLine("error", `Error: ${check.error.issues[0].message}`);
					addLine("prompt", "[?] Enter subject of inquiry:");
					return;
				}
				setDraft((prev) => ({ ...prev, subject: trimmed }));
				setState("PROMPT_MESSAGE");
				addLine("prompt", "[?] Enter message payload (min 10 characters):");
				break;
			}

			case "PROMPT_MESSAGE": {
				addLine("input", trimmed, "message >");
				const check = contactSchema.shape.message.safeParse(trimmed);
				if (!check.success) {
					addLine("error", `Error: ${check.error.issues[0].message}`);
					addLine("prompt", "[?] Enter message payload (min 10 characters):");
					return;
				}
				setDraft((prev) => ({ ...prev, message: trimmed }));
				setState("PROMPT_CONFIRM");
				addLine("prompt", "[?] Transmit packet to server gateway now? [Y/n]:");
				break;
			}

			case "PROMPT_CONFIRM": {
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
				break;
			}

			default:
				setState("IDLE");
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (isPending) return;

		const current = inputValue;
		setInputValue("");

		if (state === "IDLE") {
			handleCommand(current);
		} else {
			handleWizardInput(current);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
	};

	return (
		<section
			className="rounded-lg border border-zinc-800 bg-black/95 font-mono shadow-2xl overflow-hidden cursor-text flex flex-col h-[320px]"
			onClick={() => inputRef.current?.focus()}
			onKeyDown={(e) => {
				if (e.target === e.currentTarget) {
					inputRef.current?.focus();
				}
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
