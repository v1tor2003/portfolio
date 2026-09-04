import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ContactTerminal } from "./ContactTerminal";

vi.mock("../server/send-contact-email", () => ({
	sendContactEmail: vi.fn(),
}));

import { sendContactEmail } from "../server/send-contact-email";

function submitInput(input: HTMLElement) {
	const form = input.closest("form");
	if (!form) throw new Error("Form element not found for input");
	fireEvent.submit(form);
}

describe("ContactTerminal Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders terminal initial banner and root prompt", () => {
		render(<ContactTerminal />);

		expect(screen.getByText(/SYSTEM TERMINAL OS/i)).toBeInTheDocument();
		expect(screen.getByText("root@vitor-server:~#")).toBeInTheDocument();
		expect(screen.getByLabelText("Terminal Input")).toBeInTheDocument();
	});

	it("executes help command and displays command manual", () => {
		render(<ContactTerminal />);

		const input = screen.getByLabelText("Terminal Input");
		fireEvent.change(input, { target: { value: "help" } });
		submitInput(input);

		expect(screen.getByText(/AVAILABLE COMMANDS:/i)).toBeInTheDocument();
		expect(
			screen.getByText(/Initiate interactive message packet transmission/i),
		).toBeInTheDocument();
	});

	it("executes skills command and displays tech stack matrix", () => {
		render(<ContactTerminal />);

		const input = screen.getByLabelText("Terminal Input");
		fireEvent.change(input, { target: { value: "skills" } });
		submitInput(input);

		expect(screen.getByText(/TECH STACK MATRIX:/i)).toBeInTheDocument();
		expect(screen.getByText(/\[BACKEND & LANGUAGES\]/i)).toBeInTheDocument();
	});

	it("runs the full interactive connect wizard and dispatches message packet", async () => {
		vi.mocked(sendContactEmail).mockResolvedValueOnce({
			success: true,
			message: "Packet transmitted to gateway.",
		});

		render(<ContactTerminal />);

		const input = screen.getByLabelText("Terminal Input");

		// 1. Initiate connect
		fireEvent.change(input, { target: { value: "connect" } });
		submitInput(input);

		expect(
			screen.getByText(/INITIATING SECURE TRANSMISSION WIZARD/i),
		).toBeInTheDocument();
		expect(screen.getByText("[?] Enter your name:")).toBeInTheDocument();

		// 2. Enter name
		fireEvent.change(input, { target: { value: "Dennis Ritchie" } });
		submitInput(input);

		expect(
			screen.getByText("[?] Enter your email address:"),
		).toBeInTheDocument();

		// 3. Enter email
		fireEvent.change(input, { target: { value: "dmr@bell-labs.com" } });
		submitInput(input);

		expect(
			screen.getByText("[?] Enter subject of inquiry:"),
		).toBeInTheDocument();

		// 4. Enter subject
		fireEvent.change(input, { target: { value: "C Architecture Discussion" } });
		submitInput(input);

		expect(
			screen.getByText("[?] Enter message payload (min 10 characters):"),
		).toBeInTheDocument();

		// 5. Enter message
		fireEvent.change(input, {
			target: {
				value: "Discussing server concurrency and Unix pipeline models.",
			},
		});
		submitInput(input);

		expect(
			screen.getByText("[?] Transmit packet to server gateway now? [Y/n]:"),
		).toBeInTheDocument();

		// 6. Confirm transmission
		fireEvent.change(input, { target: { value: "y" } });
		submitInput(input);

		await waitFor(() => {
			expect(sendContactEmail).toHaveBeenCalledWith(
				expect.objectContaining({
					name: "Dennis Ritchie",
					email: "dmr@bell-labs.com",
					subject: "C Architecture Discussion",
					message: "Discussing server concurrency and Unix pipeline models.",
				}),
			);
			expect(screen.getByText(/STATUS: 200 OK/i)).toBeInTheDocument();
		});
	});
});
