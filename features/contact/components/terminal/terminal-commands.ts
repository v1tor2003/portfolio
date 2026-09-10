import type { TerminalLine } from "./terminal.types";

export interface CommandContext {
	args: string[];
	addLine: (type: TerminalLine["type"], text: string, prefix?: string) => void;
	clearLines: () => void;
	startWizard: () => void;
	registry: ICommandRegistry;
}

export interface ICommandRegistry {
	getCommands(): TerminalCommandHandler[];
}

export interface TerminalCommandHandler {
	readonly name: string;
	readonly aliases?: string[];
	readonly description: string;
	execute(ctx: CommandContext): void;
}

export class HelpCommand implements TerminalCommandHandler {
	readonly name = "help";
	readonly description = "List all available terminal commands";

	execute(ctx: CommandContext): void {
		const commands = ctx.registry.getCommands();
		const formatted = commands
			.map((cmd) => `  ${cmd.name.padEnd(10)} - ${cmd.description}`)
			.join("\n");

		ctx.addLine("output", `AVAILABLE COMMANDS:\n${formatted}`);
	}
}

export class SkillsCommand implements TerminalCommandHandler {
	readonly name = "skills";
	readonly description = "List core backend, cloud & architecture stack";

	execute(ctx: CommandContext): void {
		ctx.addLine(
			"output",
			`TECH STACK MATRIX:
  [BACKEND & LANGUAGES]   C#, .NET, Node.js, TypeScript, Go, REST APIs
  [CLOUD & INFRASTRUCTURE] AWS, DigitalOcean, Railway, Linux VPS, Docker, CI/CD
  [DATABASES & SYSTEM]    PostgreSQL, Redis, Microservices, Distributed Systems`,
		);
	}
}

export class BioCommand implements TerminalCommandHandler {
	readonly name = "bio";
	readonly description = "View backend software engineering background";

	execute(ctx: CommandContext): void {
		ctx.addLine(
			"output",
			`ENGINEER PROFILE:
  Name:     Vítor Pires
  Role:     Backend Software Engineer
  Mission:  Building resilient server-side microservices, high-throughput APIs and reliable cloud infrastructure.`,
		);
	}
}

export class SocialsCommand implements TerminalCommandHandler {
	readonly name = "socials";
	readonly description = "Display direct channels (Email, LinkedIn, GitHub)";

	execute(ctx: CommandContext): void {
		ctx.addLine(
			"output",
			`CHANNELS:
  Email:    vitor.pr04@hotmail.com
  LinkedIn: https://linkedin.com/in/pires-vitor
  GitHub:   https://github.com/v1tor2003`,
		);
	}
}

export class ClearCommand implements TerminalCommandHandler {
	readonly name = "clear";
	readonly description = "Clear the terminal screen";

	execute(ctx: CommandContext): void {
		ctx.clearLines();
	}
}

export class ConnectCommand implements TerminalCommandHandler {
	readonly name = "connect";
	readonly aliases = ["contact", "send", "mail"];
	readonly description = "Initiate interactive message packet transmission";

	execute(ctx: CommandContext): void {
		ctx.startWizard();
	}
}

export class CommandRegistry implements ICommandRegistry {
	private readonly handlers = new Map<string, TerminalCommandHandler>();
	private readonly aliasMap = new Map<string, string>();

	register(handler: TerminalCommandHandler): this {
		this.handlers.set(handler.name.toLowerCase(), handler);
		if (handler.aliases) {
			for (const alias of handler.aliases) {
				this.aliasMap.set(alias.toLowerCase(), handler.name.toLowerCase());
			}
		}
		return this;
	}

	get(name: string): TerminalCommandHandler | undefined {
		const lower = name.toLowerCase();
		const resolvedName = this.aliasMap.get(lower) || lower;
		return this.handlers.get(resolvedName);
	}

	execute(name: string, ctx: CommandContext): boolean {
		const handler = this.get(name);
		if (!handler) {
			return false;
		}
		handler.execute(ctx);
		return true;
	}

	getCommands(): TerminalCommandHandler[] {
		return Array.from(this.handlers.values());
	}
}

export function createDefaultCommandRegistry(): CommandRegistry {
	const registry = new CommandRegistry();

	registry
		.register(new ConnectCommand())
		.register(new SkillsCommand())
		.register(new BioCommand())
		.register(new SocialsCommand())
		.register(new ClearCommand())
		.register(new HelpCommand());

	return registry;
}
