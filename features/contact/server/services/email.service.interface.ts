import type { ContactFormData } from "../../schemas/contact.schema";

export type EmailDispatchResult =
	| { success: true; simulated?: boolean; messageId?: string }
	| { success: false; error: string; details?: unknown };

export interface IEmailService {
	send(data: ContactFormData): Promise<EmailDispatchResult>;
}
