"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { contactSchema } from "../schemas/contact.schema";
import { sendContactEmail } from "../server/send-contact-email";

interface TerminalLine {
	id: string;
	type: "system" | "input" | "output" | "error" | "success" | "prompt";
	text: string;
}

type TerminalState =
	| "IDLE"
	| "PROMPT_NAME"
	| "PROMPT_EMAIL"
	| "PROMPT_SUBJECT"
	| "PROMPT_MESSAGE"
	| "PROMPT_CONFIRM"
	| "TRANSMITTING";

const INITIAL_LINES: TerminalLine[] = [
	{
		id: "sys-1",
		type: "system",
		text: "VÍTOR PIRES TERMINAL OS [v2.6.0-release]",
	},
	{
		id: "sys-2",
		type: "system",
		text: "Type 'help' for commands, or 'connect' to initiate secure message packet.",
	},
];

export function ContactTerminal() {
	const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);
	const [inputValue, setInputValue] = useState("");
	const [state, setState] = useState<TerminalState>("IDLE");
	const [history, setHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState<number>(-1);
	const [isPending, startTransition] = useTransition();

	// Draft state for connect wizard
	const [draft, setDraft] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
		botField: "",
	});

	const terminalEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const scrollToBottom = () => {
		terminalEndRef.current?.scrollIntoView?.({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
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
  Role:     Backend Software Engineer & Cloud Architect
  Mission:  Building resilient server-side microservices, high-throughput APIs,
            and reliable cloud infrastructure.`,
				);
				break;

			case "socials":
				addLine(
					"output",
					`CHANNELS:
  Email:    vitor.pr04@hotmail.com
  LinkedIn: https://linkedin.com/in/vitor-pires
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
				setDraft({
					name: "",
					email: "",
					subject: "",
					message: "",
					botField: "",
				});
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
				addLine("prompt", `[?] Transmit packet to server gateway now? [Y/n]:`);
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

				startTransition(async () => {
					try {
						const res = await sendContactEmail(draft);
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
					} catch {
						addLine(
							"error",
							"[STATUS: 500] Network timeout reaching gateway host.",
						);
					} finally {
						setState("IDLE");
					}
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
		<section
			className="rounded-lg border border-zinc-800 bg-black/95 font-mono shadow-2xl overflow-hidden cursor-text"
			onClick={() => inputRef.current?.focus()}
			onKeyDown={(e) => {
				if (e.target === e.currentTarget) {
					inputRef.current?.focus();
				}
			}}
			aria-label="Interactive Terminal"
		>
			{/* Window Bar */}
			<div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950 px-4 py-2.5 text-xs text-zinc-400 select-none">
				<div className="flex items-center space-x-2">
					<span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
					<span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
					<span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
					<span className="ml-2 text-zinc-400 font-semibold tracking-wide">
						root@vitor-server:~# [bash]
					</span>
				</div>

				<div className="flex items-center space-x-2 text-[10px] text-zinc-500">
					<span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
					<span>TLS_1.3_SECURE</span>
				</div>
			</div>

			{/* Quick Action Chips for mobile or quick clicks */}
			<div className="flex flex-wrap items-center gap-2 border-b border-zinc-900 bg-zinc-950/40 px-4 py-2 text-[11px]">
				<span className="text-zinc-600 select-none">QUICK_RUN:</span>
				<button
					type="button"
					onClick={() => handleCommand("connect")}
					disabled={state !== "IDLE" || isPending}
					className="rounded border border-emerald-900/60 bg-emerald-950/30 px-2 py-0.5 text-emerald-400 hover:bg-emerald-900/40 hover:text-emerald-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
				>
					connect
				</button>
				<button
					type="button"
					onClick={() => handleCommand("skills")}
					disabled={state !== "IDLE" || isPending}
					className="rounded border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
				>
					skills
				</button>
				<button
					type="button"
					onClick={() => handleCommand("bio")}
					disabled={state !== "IDLE" || isPending}
					className="rounded border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
				>
					bio
				</button>
				<button
					type="button"
					onClick={() => handleCommand("help")}
					disabled={state !== "IDLE" || isPending}
					className="rounded border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
				>
					help
				</button>
				<button
					type="button"
					onClick={() => handleCommand("clear")}
					disabled={state !== "IDLE" || isPending}
					className="rounded border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed ml-auto"
				>
					clear
				</button>
			</div>

			{/* Terminal Buffer Window */}
			<div className="p-4 sm:p-5 text-xs sm:text-sm max-h-[380px] min-h-[280px] overflow-y-auto space-y-2">
				{lines.map((line) => {
					let lineStyle = "text-zinc-300";
					if (line.type === "system") lineStyle = "text-zinc-500 italic";
					if (line.type === "input") lineStyle = "text-white font-bold";
					if (line.type === "error") lineStyle = "text-rose-400";
					if (line.type === "success")
						lineStyle = "text-emerald-400 font-semibold";
					if (line.type === "prompt")
						lineStyle = "text-amber-300 font-semibold";

					return (
						<div key={line.id} className={`${lineStyle} whitespace-pre-wrap`}>
							{line.text}
						</div>
					);
				})}

				{/* Active Input Line with Blinking Cursor */}
				<form
					onSubmit={handleSubmit}
					className="flex items-center space-x-2 pt-1"
				>
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
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={handleKeyDown}
							disabled={state === "TRANSMITTING" || isPending}
							className="w-full bg-transparent text-white focus:outline-none caret-white"
							spellCheck={false}
							autoComplete="off"
							aria-label="Terminal Input"
						/>
					</div>
				</form>

				<div ref={terminalEndRef} />
			</div>
		</section>
	);
}
