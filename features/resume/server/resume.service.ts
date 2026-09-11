import fs from "node:fs";
import path from "node:path";
import { ApiClient, FetchTransport, isOk } from "@v1tor2003/command-api";
import { env } from "@/lib/env";
import { FetchResumeCommand } from "./fetch-resume.command";

export type ResumeLocale = "en" | "pt-BR";

export interface ResumeFileResult {
	buffer: Buffer;
	fileName: string;
	contentType: string;
	size: number;
	isFallback: boolean;
	source: "remote" | "local-fallback";
}

export interface IResumeService {
	getResume(locale?: ResumeLocale): Promise<ResumeFileResult>;
}

export interface ResumeServiceDependencies {
	client?: ApiClient;
	readFallback?: (locale?: ResumeLocale) => Buffer;
	token?: string;
	owner?: string;
	repo?: string;
	filePath?: string;
}

function defaultReadFallbackFile(locale: ResumeLocale = "en"): Buffer {
	const specificPath = path.join(
		process.cwd(),
		"public",
		"resumes",
		`vitor-pires-resume-${locale}.pdf`,
	);
	if (fs.existsSync(specificPath)) {
		return fs.readFileSync(specificPath);
	}
	const fallbackPath = path.join(
		process.cwd(),
		"public",
		"resumes",
		"vitor-pires-resume.pdf",
	);
	return fs.readFileSync(fallbackPath);
}

function defaultCreateGitHubClient(): ApiClient {
	return new ApiClient({
		transport: new FetchTransport({
			baseUrl: "https://api.github.com",
		}),
	});
}

export class ResumeService implements IResumeService {
	private readonly client: ApiClient;
	private readonly readFallback: (locale?: ResumeLocale) => Buffer;
	private readonly token?: string;
	private readonly owner: string;
	private readonly repo: string;
	private readonly filePath: string;

	constructor(deps?: ResumeServiceDependencies) {
		this.client = deps?.client ?? defaultCreateGitHubClient();
		this.readFallback = deps?.readFallback ?? defaultReadFallbackFile;
		this.token = deps?.token ?? env.GITHUB_TOKEN ?? env.GITHUB_RESUME_TOKEN;
		this.owner = deps?.owner ?? env.RESUME_REPO_OWNER;
		this.repo = deps?.repo ?? env.RESUME_REPO_NAME;
		this.filePath = deps?.filePath ?? env.RESUME_FILE_PATH;
	}

	async getResume(locale: ResumeLocale = "en"): Promise<ResumeFileResult> {
		const targetFileName = `vitor-pires-resume-${locale}.pdf`;

		if (this.token && locale === "en") {
			try {
				const command = new FetchResumeCommand({
					owner: this.owner,
					repo: this.repo,
					path: this.filePath,
					token: this.token,
				});

				const result = await this.client.send(command);

				if (isOk(result) && result.data) {
					const response = result.data;
					if (response.content && response.encoding === "base64") {
						const cleanBase64 = response.content.replace(/\s+/g, "");
						const buffer = Buffer.from(cleanBase64, "base64");

						return {
							buffer,
							fileName: targetFileName,
							contentType: "application/pdf",
							size: buffer.length,
							isFallback: false,
							source: "remote",
						};
					}
				}
			} catch {
				// Silently fall back to bundled PDF if remote fetch encounters any issue
			}
		}

		const fallbackBuffer = this.readFallback(locale);
		return {
			buffer: fallbackBuffer,
			fileName: targetFileName,
			contentType: "application/pdf",
			size: fallbackBuffer.length,
			isFallback: true,
			source: "local-fallback",
		};
	}
}

let cachedResumeService: IResumeService | null = null;

export function getResumeService(): IResumeService {
	if (!cachedResumeService) {
		cachedResumeService = new ResumeService();
	}
	return cachedResumeService;
}
