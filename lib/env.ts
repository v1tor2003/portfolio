import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
		RESEND_API_KEY: z.string().min(1).optional(),
		RESEND_API_LOGGING: z.boolean().default(true),
		CONTACT_TO_EMAIL: z.email().default("vitor.pr04@hotmail.com"),
		CONTACT_FROM_EMAIL: z.string().min(1).default("onboarding@resend.dev"),
		GITHUB_TOKEN: z.string().min(1).optional(),
		GITHUB_RESUME_TOKEN: z.string().min(1).optional(),
		GITHUB_WORK_TOKEN: z.string().min(1).optional(),
		GITHUB_WORK_USERNAME: z.string().min(1).default("vitor-pires_tecnosul"),
		RESUME_REPO_OWNER: z.string().min(1).default("v1tor2003"),
		RESUME_REPO_NAME: z.string().min(1).default("resume"),
		RESUME_FILE_PATH: z.string().min(1).default("vitor-pires-resume.pdf"),
	},
	client: {},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		RESEND_API_LOGGING: process.env.RESEND_API_LOGGING,
		CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
		CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
		GITHUB_TOKEN: process.env.GITHUB_TOKEN,
		GITHUB_RESUME_TOKEN: process.env.GITHUB_RESUME_TOKEN,
		GITHUB_WORK_TOKEN: process.env.GITHUB_WORK_TOKEN,
		GITHUB_WORK_USERNAME: process.env.GITHUB_WORK_USERNAME,
		RESUME_REPO_OWNER: process.env.RESUME_REPO_OWNER,
		RESUME_REPO_NAME: process.env.RESUME_REPO_NAME,
		RESUME_FILE_PATH: process.env.RESUME_FILE_PATH,
	},
	isServer: typeof window === "undefined" || process.env.NODE_ENV === "test",
	emptyStringAsUndefined: true,
});
