import { describe, expect, it, vi } from "vitest";
import {
	BioCommand,
	ClearCommand,
	CommandRegistry,
	ConnectCommand,
	HelpCommand,
	SkillsCommand,
	SocialsCommand,
	createDefaultCommandRegistry,
} from "./terminal-commands";
import type { CommandContext, TerminalCommandHandler } from "./terminal-commands";

describe("terminal-commands and CommandRegistry", () => {
	it("registers and executes a command", () => {
		const registry = new CommandRegistry();
		const executeFn = vi.fn();
		const mockCommand: TerminalCommandHandler = {
			name: "ping",
			description: "Send ping packet",
			execute: executeFn,
		};

		registry.register(mockCommand);

		const mockCtx: CommandContext = {
			args: [],
			addLine: vi.fn(),
			clearLines: vi.fn(),
			startWizard: vi.fn(),
			registry,
		};

		const result = registry.execute("ping", mockCtx);

		expect(result).toBe(true);
		expect(executeFn).toHaveBeenCalledWith(mockCtx);
	});

	it("executes a command using aliases case-insensitively", () => {
		const registry = new CommandRegistry();
		const executeFn = vi.fn();
		const mockCommand: TerminalCommandHandler = {
			name: "connect",
			aliases: ["contact", "mail"],
			description: "Connect command",
			execute: executeFn,
		};

		registry.register(mockCommand);

		const mockCtx: CommandContext = {
			args: ["param"],
			addLine: vi.fn(),
			clearLines: vi.fn(),
			startWizard: vi.fn(),
			registry,
		};

		expect(registry.execute("CONTACT", mockCtx)).toBe(true);
		expect(registry.execute("mail", mockCtx)).toBe(true);
		expect(executeFn).toHaveBeenCalledTimes(2);
	});

	it("returns false when command is not found", () => {
		const registry = new CommandRegistry();
		const mockCtx: CommandContext = {
			args: [],
			addLine: vi.fn(),
			clearLines: vi.fn(),
			startWizard: vi.fn(),
			registry,
		};

		const result = registry.execute("nonexistent", mockCtx);

		expect(result).toBe(false);
	});

	it("returns all registered commands", () => {
		const registry = new CommandRegistry();
		const cmd1: TerminalCommandHandler = {
			name: "cmd1",
			description: "First command",
			execute: vi.fn(),
		};
		const cmd2: TerminalCommandHandler = {
			name: "cmd2",
			description: "Second command",
			execute: vi.fn(),
		};

		registry.register(cmd1).register(cmd2);

		const commands = registry.getCommands();
		expect(commands).toHaveLength(2);
		expect(commands).toContain(cmd1);
		expect(commands).toContain(cmd2);
	});

	it("creates default registry containing all built-in commands", () => {
		const registry = createDefaultCommandRegistry();
		const commands = registry.getCommands();

		const names = commands.map((c) => c.name);
		expect(names).toContain("connect");
		expect(names).toContain("skills");
		expect(names).toContain("bio");
		expect(names).toContain("socials");
		expect(names).toContain("clear");
		expect(names).toContain("help");
	});

	it("executes concrete commands correctly", () => {
		const addLine = vi.fn();
		const clearLines = vi.fn();
		const startWizard = vi.fn();
		const registry = new CommandRegistry();

		const ctx: CommandContext = {
			args: [],
			addLine,
			clearLines,
			startWizard,
			registry,
		};

		new HelpCommand().execute(ctx);
		expect(addLine).toHaveBeenCalledWith("output", expect.stringContaining("AVAILABLE COMMANDS"));

		new SkillsCommand().execute(ctx);
		expect(addLine).toHaveBeenCalledWith("output", expect.stringContaining("TECH STACK MATRIX"));

		new BioCommand().execute(ctx);
		expect(addLine).toHaveBeenCalledWith("output", expect.stringContaining("ENGINEER PROFILE"));

		new SocialsCommand().execute(ctx);
		expect(addLine).toHaveBeenCalledWith("output", expect.stringContaining("CHANNELS"));

		new ClearCommand().execute(ctx);
		expect(clearLines).toHaveBeenCalled();

		new ConnectCommand().execute(ctx);
		expect(startWizard).toHaveBeenCalled();
	});
});

