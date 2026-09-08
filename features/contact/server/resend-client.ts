import { ApiClient, FetchTransport } from "@v1tor2003/command-api";
import { env } from "@/lib/env";

export const ResendClientFactory = {
	create(): ApiClient {
		return new ApiClient({
			transport: new FetchTransport({
				baseUrl: "https://api.resend.com",
				headers: {
					Authorization: `Bearer ${env.RESEND_API_KEY}`,
				},
			}),
			logging: env.RESEND_API_LOGGING ?? true,
		});
	},
};
