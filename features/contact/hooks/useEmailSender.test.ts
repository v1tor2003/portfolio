import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ContactActionResult } from "../server/send-contact-email";
import { useEmailSender } from "./useEmailSender";

vi.mock("../server/send-contact-email", () => ({
	sendContactEmail: vi.fn(),
}));

import { sendContactEmail } from "../server/send-contact-email";

describe("useEmailSender Hook", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("initializes with idle pending state and null result", () => {
		const { result } = renderHook(() => useEmailSender());

		expect(result.current.isPending).toBe(false);
		expect(result.current.result).toBeNull();
	});

	it("dispatches email through server action and updates state", async () => {
		vi.mocked(sendContactEmail).mockResolvedValueOnce({
			success: true,
			message: "Packet dispatched successfully.",
		});

		const { result } = renderHook(() => useEmailSender());

		let actionResult: ContactActionResult | undefined;
		await act(async () => {
			actionResult = await result.current.sendEmail({
				name: "Ada Lovelace",
				email: "ada@analytical-engine.org",
				subject: "Algorithm Spec",
				message: "Drafting first machine algorithm notes.",
			});
		});

		expect(actionResult).toEqual({
			success: true,
			message: "Packet dispatched successfully.",
		});
		expect(result.current.result).toEqual({
			success: true,
			message: "Packet dispatched successfully.",
		});
		expect(result.current.isPending).toBe(false);
	});

	it("handles error results cleanly and updates state", async () => {
		vi.mocked(sendContactEmail).mockResolvedValueOnce({
			success: false,
			message: "Failed to dispatch email transmission.",
		});

		const { result } = renderHook(() => useEmailSender());

		let actionResult: ContactActionResult | undefined;
		await act(async () => {
			actionResult = await result.current.sendEmail({
				name: "Grace Hopper",
				email: "grace@nanoseconds.navy.mil",
				subject: "Compiler Architecture",
				message: "Developing compiler subroutine library.",
			});
		});

		expect(actionResult).toEqual({
			success: false,
			message: "Failed to dispatch email transmission.",
		});
		expect(result.current.result?.success).toBe(false);
		expect(result.current.isPending).toBe(false);
	});

	it("resets result state when reset is called", async () => {
		vi.mocked(sendContactEmail).mockResolvedValueOnce({
			success: true,
			message: "Dispatched",
		});

		const { result } = renderHook(() => useEmailSender());

		await act(async () => {
			await result.current.sendEmail({
				name: "Alan Turing",
				email: "alan@bletchley.ac.uk",
				subject: "Enigma Cryptanalysis",
				message: "Testing bombe state machine transitions.",
			});
		});

		expect(result.current.result).not.toBeNull();

		act(() => {
			result.current.reset();
		});

		expect(result.current.result).toBeNull();
	});
});
