import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./ContactForm";

vi.mock("../server/send-contact-email", () => ({
	sendContactEmail: vi.fn(),
}));

import { sendContactEmail } from "../server/send-contact-email";

describe("ContactForm Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders all form fields and transmit button", () => {
		render(<ContactForm />);

		expect(screen.getByLabelText(/NAME/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/EMAIL/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/SUBJECT/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/MESSAGE_PAYLOAD/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /\[TRANSMIT_PACKET\]/i }),
		).toBeInTheDocument();
	});

	it("shows client validation errors on invalid inputs", async () => {
		render(<ContactForm />);

		const submitButton = screen.getByRole("button", {
			name: /\[TRANSMIT_PACKET\]/i,
		});

		fireEvent.change(screen.getByLabelText(/NAME/i), {
			target: { value: "A" },
		});
		fireEvent.change(screen.getByLabelText(/EMAIL/i), {
			target: { value: "invalid-email" },
		});
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(
				screen.getByText("Name must be at least 2 characters."),
			).toBeInTheDocument();
			expect(
				screen.getByText("Please provide a valid email address."),
			).toBeInTheDocument();
		});
	});

	it("submits valid data to server action and displays success feedback", async () => {
		vi.mocked(sendContactEmail).mockResolvedValueOnce({
			success: true,
			message: "Transmission successful. Packet received by gateway.",
		});

		render(<ContactForm />);

		fireEvent.change(screen.getByLabelText(/NAME/i), {
			target: { value: "John Carmack" },
		});
		fireEvent.change(screen.getByLabelText(/EMAIL/i), {
			target: { value: "carmack@idsoftware.com" },
		});
		fireEvent.change(screen.getByLabelText(/SUBJECT/i), {
			target: { value: "Low Latency Rendering" },
		});
		fireEvent.change(screen.getByLabelText(/MESSAGE_PAYLOAD/i), {
			target: {
				value:
					"Discussing server concurrency and high throughput architectures.",
			},
		});

		const submitButton = screen.getByRole("button", {
			name: /\[TRANSMIT_PACKET\]/i,
		});
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(sendContactEmail).toHaveBeenCalledWith(
				expect.objectContaining({
					name: "John Carmack",
					email: "carmack@idsoftware.com",
					subject: "Low Latency Rendering",
					message:
						"Discussing server concurrency and high throughput architectures.",
				}),
			);
			expect(
				screen.getByText(
					"Transmission successful. Packet received by gateway.",
				),
			).toBeInTheDocument();
		});
	});
});
