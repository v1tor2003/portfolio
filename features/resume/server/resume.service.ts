import fs from "node:fs";
import path from "node:path";
import { inject, injectable } from "inversify";
import { env } from "@/lib/env";
import { DI_TYPES } from "@/lib/di/types";
import { GitHubService } from "@/lib/github/github.service";
import type { IGitHubService } from "@/lib/github/github.service.interface";
import type {
	IResumeService,
	ResumeFileResult,
	ResumeLocale,
} from "./resume.service.interface";

export type { IResumeService, ResumeFileResult, ResumeLocale };

export interface ResumeServiceDependencies {
	gitHubService?: IGitHubService;
	readFallback?: (locale?: ResumeLocale) => Buffer;
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

@injectable()
export class ResumeService implements IResumeService {
	private readonly gitHubService: IGitHubService;
	private readonly readFallback: (locale?: ResumeLocale) => Buffer;
	private readonly owner: string;
	private readonly repo: string;
	private readonly filePath: string;

	constructor(
		@inject(DI_TYPES.IGitHubService)
		gitHubServiceOrDeps?: IGitHubService | ResumeServiceDependencies,
		maybeDeps?: ResumeServiceDependencies,
	) {
		let gitHubService: IGitHubService | undefined;
		let deps: ResumeServiceDependencies | undefined;

		if (gitHubServiceOrDeps && "getFile" in gitHubServiceOrDeps) {
			gitHubService = gitHubServiceOrDeps as IGitHubService;
			deps = maybeDeps;
		} else {
			deps = gitHubServiceOrDeps as ResumeServiceDependencies;
		}

		this.gitHubService =
			deps?.gitHubService ?? gitHubService ?? new GitHubService();
		this.readFallback = deps?.readFallback ?? defaultReadFallbackFile;
		this.owner = deps?.owner ?? env.RESUME_REPO_OWNER;
		this.repo = deps?.repo ?? env.RESUME_REPO_NAME;
		this.filePath = deps?.filePath ?? env.RESUME_FILE_PATH;
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
}
