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
