"use server";

import { env } from "@/lib/env";
import { contactSchema } from "../schemas/contact.schema";
import { createResendClient } from "./resend-client";
import { SendResendEmailCommand } from "./send-resend-email.command";

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

	if (!env.RESEND_API_KEY) {
		// Mock/simulated transmission when no provider key is configured
		return {
			success: true,
			message: "Packet transmitted successfully (Simulated mode).",
			simulated: true,
		};
	}

	try {
		const client = createResendClient(env.RESEND_API_KEY);
		const command = new SendResendEmailCommand({
			from: env.CONTACT_FROM_EMAIL,
			to: env.CONTACT_TO_EMAIL,
			reply_to: email,
			subject: `[Portfolio Contact] ${subject} - ${name}`,
			text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
		});

		const result = await client.send(command);

		if (result.error) {
			console.error(
				"[SendContactEmail] Failed to dispatch via Resend:",
				result.error.message,
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
