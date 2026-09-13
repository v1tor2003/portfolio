import fs from "node:fs";
import path from "node:path";
import { inject, injectable } from "inversify";
import { env } from "@/lib/env";
import { DI_TYPES } from "@/lib/di/types";
import type { IGitHubService } from "@/lib/github/github.service.interface";
import type {
	IResumeService,
	ResumeFileResult,
	ResumeLocale,
} from "./resume.service.interface";

export type { IResumeService, ResumeFileResult, ResumeLocale };


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

@injectable()
export class ResumeService implements IResumeService {
	constructor(
		@inject(DI_TYPES.IGitHubService)
		private readonly gitHubService: IGitHubService,
		readFallbackOrDeps?:
			| ((locale?: ResumeLocale) => Buffer)
			| {
					readFallback?: (locale?: ResumeLocale) => Buffer;
					owner?: string;
					repo?: string;
					filePath?: string;
			  },
		private readonly owner: string = env.RESUME_REPO_OWNER,
		private readonly repo: string = env.RESUME_REPO_NAME,
		private readonly filePath: string = env.RESUME_FILE_PATH,
	) {
		if (typeof readFallbackOrDeps === "function") {
			this.readFallback = readFallbackOrDeps;
		} else if (readFallbackOrDeps && typeof readFallbackOrDeps === "object") {
			this.readFallback =
				readFallbackOrDeps.readFallback ?? defaultReadFallbackFile;
			if (readFallbackOrDeps.owner) this.owner = readFallbackOrDeps.owner;
			if (readFallbackOrDeps.repo) this.repo = readFallbackOrDeps.repo;
			if (readFallbackOrDeps.filePath)
				this.filePath = readFallbackOrDeps.filePath;
		} else {
			this.readFallback = defaultReadFallbackFile;
		}
	}
	private readonly readFallback: (locale?: ResumeLocale) => Buffer;

	async getResume(locale: ResumeLocale = "en"): Promise<ResumeFileResult> {
		const targetFileName = `vitor-pires-resume-${locale}.pdf`;

		try {
			const remoteBuffer = await this.gitHubService.getFile(
				this.owner,
				this.repo,
				targetFileName,
			);

			if (remoteBuffer) {
				return {
					buffer: remoteBuffer,
					fileName: targetFileName,
					contentType: "application/pdf",
					size: remoteBuffer.length,
					isFallback: false,
					source: "remote",
				};
			}
		} catch {
			// Silently fall back to bundled PDF
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
