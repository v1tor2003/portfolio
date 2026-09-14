import fs from "node:fs";
import path from "node:path";
import { inject, injectable } from "inversify";
import { DI_TYPES } from "@/lib/di/types";
import { env } from "@/lib/env";
import type { IGitHubService } from "@/lib/github/github.service.interface";
import type {
	IResumeService,
	ResumeFileResult,
	ResumeLocale,
} from "./resume.service.interface";

export type { IResumeService, ResumeFileResult, ResumeLocale };

@injectable()
export class ResumeService implements IResumeService {
	private readonly readFallback: (locale?: ResumeLocale) => Buffer;

	constructor(
		@inject(DI_TYPES.IGitHubService)
		private readonly gitHubService: IGitHubService,
		readFallback: (locale?: ResumeLocale) => Buffer = ResumeService.defaultReadFallbackFile,
		private readonly owner: string = env.GITHUB_PERSONAL_USERNAME,
		private readonly repo: string = "resume",
	) {
		this.readFallback = readFallback;
	}

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

  private static defaultReadFallbackFile(locale: ResumeLocale = "en"): Buffer {
	const specificPath = path.join(
		process.cwd(),
		"public",
		"resumes",
		`vitor-pires-resume-${locale}.pdf`,
	);

	if (fs.existsSync(specificPath))
		return fs.readFileSync(specificPath);
	
	const fallbackPath = path.join(
		process.cwd(),
		"public",
		"resumes",
		"vitor-pires-resume.pdf",
	);

	return fs.readFileSync(fallbackPath);
}
}
