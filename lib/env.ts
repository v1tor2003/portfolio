import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
		RESEND_API_KEY: z.string().min(1).optional(),
		CONTACT_TO_EMAIL: z.string().email().default("vitor.pr04@hotmail.com"),
		CONTACT_FROM_EMAIL: z.string().min(1).default("onboarding@resend.dev"),
	},
	client: {},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
		CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
	},
	isServer: typeof window === "undefined" || process.env.NODE_ENV === "test",
	emptyStringAsUndefined: true,
});
