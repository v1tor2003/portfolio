import {
	ApiClient,
	BaseRequest,
	FetchTransport,
	type HttpRequestContext,
} from "@v1tor2003/command-api";
import { env } from "@/lib/env";
import type { ContactFormData } from "../schemas/contact.schema";
import { buildContactEmailHtml, buildContactEmailText } from "./email-template";

export type EmailDispatchResult =
	| { success: true; simulated?: boolean; messageId?: string }
	| { success: false; error: string; details?: unknown };

export interface IEmailService {
	send(data: ContactFormData): Promise<EmailDispatchResult>;
}

export interface SendResendEmailInput {
	from: string;
	to: string;
	reply_to: string;
	subject: string;
	text: string;
	html?: string;
}

export interface SendResendEmailOutput {
	id: string;
}

export class SendResendEmailCommand extends BaseRequest<
	SendResendEmailInput,
	SendResendEmailOutput
> {
	toHttp(): HttpRequestContext {
		return {
			method: "POST",
			path: "/emails",
			headers: {
				"Content-Type": "application/json",
			},
			body: this.input,
		};
	}
}

let cachedClient: ApiClient | null = null;

export const ResendClientFactory = {
	getInstance(): ApiClient {
		if (!cachedClient) {
			cachedClient = new ApiClient({
				transport: new FetchTransport({
					baseUrl: "https://api.resend.com",
					headers: {
						Authorization: `Bearer ${env.RESEND_API_KEY}`,
					},
				}),
				logging: env.RESEND_API_LOGGING ?? true,
			});
		}
		return cachedClient;
	},
	create(): ApiClient {
		return this.getInstance();
	},
	_resetInstance(): void {
		cachedClient = null;
	},
};

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

export class ResendEmailService implements IEmailService {
	private readonly getClient: () => ApiClient;

	constructor(
		clientProvider: () => ApiClient = () => ResendClientFactory.getInstance(),
	) {
		this.getClient = clientProvider;
	}

	async send(data: ContactFormData): Promise<EmailDispatchResult> {
		if (!env.RESEND_API_KEY) {
			return {
				success: true,
				simulated: true,
			};
		}

		const client = this.getClient();
		const text = buildContactEmailText(data);
		const html = buildContactEmailHtml(data);

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

export const resendEmailService = new ResendEmailService();
