"use server";

import { contactSchema } from "../schemas/contact.schema";

export interface ContactActionResult {
	success: boolean;
	message: string;
	errors?: Record<string, string[]>;
	simulated?: boolean;
}

export async function sendContactEmail(
	data: unknown,
): Promise<ContactActionResult> {
	const parsed = contactSchema.safeParse(data);

	if (!parsed.success) {
		return {
			success: false,
			message: "Invalid transmission payload. Please verify your fields.",
			errors: parsed.error.flatten().fieldErrors,
		};
	}

	const { name, email, subject, message, botField } = parsed.data;

	// Honeypot spam trap
	if (botField && botField.trim().length > 0) {
		// Silently drop bot packets
		return {
			success: true,
			message: "Message received.",
			simulated: true,
		};
	}

	const apiKey = process.env.RESEND_API_KEY;

	if (!apiKey) {
		// Mock/simulated transmission when no provider key is configured
		return {
			success: true,
			message: "Packet transmitted successfully (Simulated mode).",
			simulated: true,
		};
	}

	try {
		const toEmail = process.env.CONTACT_TO_EMAIL || "vitor.pr04@hotmail.com";
		const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

		const response = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: fromEmail,
				to: toEmail,
				reply_to: email,
				subject: `[Portfolio Contact] ${subject} - ${name}`,
				text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
			}),
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error(
				"[SendContactEmail] Failed to dispatch via Resend:",
				errorText,
			);
			return {
				success: false,
				message: "Failed to dispatch email transmission.",
			};
		}

		return {
			success: true,
			message: "Packet dispatched successfully via Resend.",
		};
	} catch (error) {
		console.error("[SendContactEmail] Network error:", error);
		return {
			success: false,
			message: "Transmission timed out or network error encountered.",
		};
	}
}
