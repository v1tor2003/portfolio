"use server";

import { z } from "zod";
import { type ContactFormData, contactSchema } from "../schemas/contact.schema";
import { contactRateLimiter } from "./rate-limiter";
import { resendEmailService } from "./resend-email.service";

export interface ContactActionResult {
	success: boolean;
	message: string;
	errors?: Partial<Record<keyof ContactFormData, string[]>>;
	simulated?: boolean;
}

async function getClientIp(): Promise<string> {
	try {
		const { headers } = await import("next/headers");
		const headerList = await headers();
		return (
			headerList.get("x-forwarded-for")?.split(",")[0].trim() ||
			headerList.get("x-real-ip") ||
			"127.0.0.1"
		);
	} catch {
		return "127.0.0.1";
	}
}

export async function sendContactEmail(
	data: unknown,
): Promise<ContactActionResult> {
	const clientIp = await getClientIp();

	if (contactRateLimiter.isRateLimited(clientIp)) {
		return {
			success: false,
			message:
				"Rate limit exceeded. Please wait a few minutes before transmitting again.",
		};
	}

	const parsed = contactSchema.safeParse(data);

	if (!parsed.success) {
		return {
			success: false,
			message: "Invalid transmission payload. Please verify your fields.",
			errors: z.flattenError(parsed.error).fieldErrors as Partial<
				Record<keyof ContactFormData, string[]>
			>,
		};
	}

	const { botField } = parsed.data;

	// Honeypot spam trap
	if (botField && botField.trim().length > 0) {
		return {
			success: true,
			message: "Message received.",
			simulated: true,
		};
	}

	const dispatchResult = await resendEmailService.send(parsed.data);

	if (!dispatchResult.success) {
		return {
			success: false,
			message: "Failed to dispatch email transmission.",
		};
	}

	if (dispatchResult.simulated) {
		return {
			success: true,
			message: "Packet transmitted successfully (Simulated mode).",
			simulated: true,
		};
	}

	return {
		success: true,
		message: "Packet dispatched successfully via Resend.",
	};
}
