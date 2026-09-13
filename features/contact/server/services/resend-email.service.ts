import type { ApiClient } from "@v1tor2003/command-api";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "@/lib/di/types";
import { env } from "@/lib/env";
import type { ContactFormData } from "../../schemas/contact.schema";
import { SendResendEmailCommand } from "../commands/send-resend-email/send-resend-email.command";
import {
	buildContactEmailHtml,
	buildContactEmailText,
} from "../templates/email-template";
import type {
	EmailDispatchResult,
	IEmailService,
} from "./email.service.interface";

export type { EmailDispatchResult, IEmailService };

interface ApiErrorDetail {
	status?: number;
	data?: unknown;
}

function getErrorDetails(error: Error): ApiErrorDetail {
	const maybeHttp = error as Error & ApiErrorDetail;
	return {
		status: maybeHttp.status,
		data: maybeHttp.data,
	};
}

@injectable()
export class ResendEmailService implements IEmailService {
	private readonly getClient: () => ApiClient;

	constructor(
		@inject(DI_TYPES.ResendApiClient)
		clientOrProvider: ApiClient | (() => ApiClient),
	) {
		this.getClient =
			typeof clientOrProvider === "function"
				? clientOrProvider
				: () => clientOrProvider;
	}

	async send(data: ContactFormData): Promise<EmailDispatchResult> {
		if (!env.RESEND_API_KEY) {
			return {
				success: true,
				simulated: true,
			};
		}

		const text = buildContactEmailText(data);
		const html = buildContactEmailHtml(data);
		const client = this.getClient();

		const result = await client.send(
			new SendResendEmailCommand({
				from: env.CONTACT_FROM_EMAIL,
				to: env.CONTACT_TO_EMAIL,
				reply_to: data.email,
				subject: `[Portfolio Contact] ${data.subject} - ${data.name}`,
				text,
				html,
			}),
		);

		if (result.error) {
			const { status, data: errorData } = getErrorDetails(result.error);

			console.error("[ResendEmailService] Failed to dispatch transmission:", {
				status,
				message: result.error.message,
				details: errorData,
			});

			const bodyMessage =
				typeof errorData === "object" &&
				errorData !== null &&
				"message" in errorData
					? String((errorData as { message: unknown }).message)
					: undefined;

			return {
				success: false,
				error:
					bodyMessage ||
					result.error.message ||
					"Failed to dispatch email transmission.",
				details: result.error,
			};
		}

		return {
			success: true,
			messageId: result.data.id,
		};
	}
}
