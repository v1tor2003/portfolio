import { BaseRequest, type HttpRequestContext } from "@v1tor2003/command-api";

export interface SendResendEmailInput {
	from: string;
	to: string;
	reply_to: string;
	subject: string;
	text: string;
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
