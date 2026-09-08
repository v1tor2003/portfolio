import { ApiClient, FetchTransport } from "@v1tor2003/command-api";

export function createResendClient(apiKey: string): ApiClient {
	return new ApiClient({
		transport: new FetchTransport({
			baseUrl: "https://api.resend.com",
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
		}),
	});
}
