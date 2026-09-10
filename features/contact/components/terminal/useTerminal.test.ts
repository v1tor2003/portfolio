import { act, renderHook } from "@testing-library/react";
import type React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useTerminal } from "./useTerminal";

vi.mock("../../server/send-contact-email", () => ({
	sendContactEmail: vi.fn(),
}));

import { sendContactEmail } from "../../server/send-contact-email";

describe("useTerminal hook", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("initializes with default system lines and IDLE state", () => {
		const { result } = renderHook(() => useTerminal());

		expect(result.current.state).toBe("IDLE");
		expect(result.current.inputValue).toBe("");
		expect(result.current.lines).toHaveLength(2);
		expect(result.current.lines[0].text).toContain("SYSTEM TERMINAL OS");
	});

	it("handles help command and outputs available commands", () => {
		const { result } = renderHook(() => useTerminal());

		act(() => {
			result.current.setInputValue("help");
		});

		act(() => {
			result.current.handleSubmit({
				preventDefault: vi.fn(),
			} as unknown as React.FormEvent);
		});

		expect(result.current.inputValue).toBe("");
		const outputLine = result.current.lines.find(
			(l) => l.type === "output" && l.text.includes("AVAILABLE COMMANDS"),
		);
		expect(outputLine).toBeDefined();
	});

	it("handles clear command and empties buffer lines", () => {
		const { result } = renderHook(() => useTerminal());

		act(() => {
			result.current.setInputValue("clear");
		});

		act(() => {
			result.current.handleSubmit({
				preventDefault: vi.fn(),
			} as unknown as React.FormEvent);
		});

		expect(result.current.lines).toEqual([]);
	});

	it("handles unknown commands gracefully with error line", () => {
		const { result } = renderHook(() => useTerminal());

		act(() => {
			result.current.setInputValue("unknown-cmd-xyz");
		});

		act(() => {
			result.current.handleSubmit({
				preventDefault: vi.fn(),
			} as unknown as React.FormEvent);
		});

		const errorLine = result.current.lines.find((l) => l.type === "error");
		expect(errorLine?.text).toContain(
			"command not found: 'unknown-cmd-xyz'. Type 'help' to see valid commands.",
		);
	});

	it("navigates command history with ArrowUp and ArrowDown", () => {
		const { result } = renderHook(() => useTerminal());

		act(() => {
			result.current.setInputValue("skills");
		});
		act(() => {
			result.current.handleSubmit({
				preventDefault: vi.fn(),
			} as unknown as React.FormEvent);
		});

		act(() => {
			result.current.setInputValue("bio");
		});
		act(() => {
			result.current.handleSubmit({
				preventDefault: vi.fn(),
			} as unknown as React.FormEvent);
		});

		// Press ArrowUp: should recall latest command 'bio'
		act(() => {
			result.current.handleKeyDown({
				key: "ArrowUp",
				preventDefault: vi.fn(),
			} as unknown as React.KeyboardEvent<HTMLInputElement>);
		});
		expect(result.current.inputValue).toBe("bio");

		// Press ArrowUp again: should recall 'skills'
		act(() => {
			result.current.handleKeyDown({
				key: "ArrowUp",
				preventDefault: vi.fn(),
			} as unknown as React.KeyboardEvent<HTMLInputElement>);
		});
		expect(result.current.inputValue).toBe("skills");

		// Press ArrowDown: should go back to 'bio'
		act(() => {
			result.current.handleKeyDown({
				key: "ArrowDown",
				preventDefault: vi.fn(),
			} as unknown as React.KeyboardEvent<HTMLInputElement>);
		});
		expect(result.current.inputValue).toBe("bio");

		// Press ArrowDown again: should clear input back to empty
		act(() => {
			result.current.handleKeyDown({
				key: "ArrowDown",
				preventDefault: vi.fn(),
			} as unknown as React.KeyboardEvent<HTMLInputElement>);
		});
		expect(result.current.inputValue).toBe("");
	});

	it("navigates the contact wizard through to completion", async () => {
		vi.mocked(sendContactEmail).mockResolvedValueOnce({
			success: true,
			message: "Message sent!",
		});

		const { result } = renderHook(() => useTerminal());

		// Trigger connect
		act(() => {
			result.current.setInputValue("connect");
		});
		act(() => {
			result.current.handleSubmit({
				preventDefault: vi.fn(),
			} as unknown as React.FormEvent);
		});

		expect(result.current.state).toBe("PROMPT_NAME");

		// Provide Name
		act(() => {
			result.current.setInputValue("Ada Lovelace");
		});
		act(() => {
			result.current.handleSubmit({
				preventDefault: vi.fn(),
			} as unknown as React.FormEvent);
		});
		expect(result.current.state).toBe("PROMPT_EMAIL");

		// Provide invalid Email
		act(() => {
			result.current.setInputValue("not-an-email");
		});
		act(() => {
			result.current.handleSubmit({
				preventDefault: vi.fn(),
			} as unknown as React.FormEvent);
		});
		expect(result.current.state).toBe("PROMPT_EMAIL");
		const errLine = result.current.lines.find(
			(l) => l.type === "error" && l.text.includes("valid email"),
		);
		expect(errLine).toBeDefined();

		// Provide valid Email
		act(() => {
			result.current.setInputValue("ada@engine.org");
		});
		act(() => {
			result.current.handleSubmit({
				preventDefault: vi.fn(),
			} as unknown as React.FormEvent);
		});
		expect(result.current.state).toBe("PROMPT_SUBJECT");

		// Provide Subject
		act(() => {
			result.current.setInputValue("Analytical Engine Specs");
		});
		act(() => {
			result.current.handleSubmit({
				preventDefault: vi.fn(),
			} as unknown as React.FormEvent);
		});
		expect(result.current.state).toBe("PROMPT_MESSAGE");

		// Provide Message
		act(() => {
			result.current.setInputValue(
				"Weaving algebraic patterns just as the Jacquard loom weaves flowers and leaves.",
			);
		});
		act(() => {
			result.current.handleSubmit({
				preventDefault: vi.fn(),
			} as unknown as React.FormEvent);
		});
		expect(result.current.state).toBe("PROMPT_CONFIRM");

		// Confirm
		await act(async () => {
			result.current.setInputValue("y");
			result.current.handleSubmit({
				preventDefault: vi.fn(),
			} as unknown as React.FormEvent);
		});

		expect(sendContactEmail).toHaveBeenCalledWith(
			expect.objectContaining({
				name: "Ada Lovelace",
				email: "ada@engine.org",
				subject: "Analytical Engine Specs",
			}),
		);
		expect(result.current.state).toBe("IDLE");
	});

	it("aborts wizard when user types cancel", () => {
		const { result } = renderHook(() => useTerminal());

		act(() => {
			result.current.setInputValue("connect");
		});
		act(() => {
			result.current.handleSubmit({
				preventDefault: vi.fn(),
			} as unknown as React.FormEvent);
		});
		expect(result.current.state).toBe("PROMPT_NAME");

		act(() => {
			result.current.setInputValue("cancel");
		});
		act(() => {
			result.current.handleSubmit({
				preventDefault: vi.fn(),
			} as unknown as React.FormEvent);
		});

		expect(result.current.state).toBe("IDLE");
		const abortLine = result.current.lines.find(
			(l) => l.type === "system" && l.text.includes("[ABORTED]"),
		);
		expect(abortLine).toBeDefined();
	});

	it("focuses input element when focusInput is invoked", () => {
		const { result } = renderHook(() => useTerminal());
		const mockFocus = vi.fn();
		// @ts-expect-error - simulating input element
		result.current.inputRef.current = { focus: mockFocus };

		act(() => {
			result.current.focusInput();
		});

		expect(mockFocus).toHaveBeenCalledTimes(1);
	});
});
