import {
	getResumeService,
	type ResumeFileResult,
	type ResumeLocale,
} from "./resume.service";

export async function getResume(
	locale?: ResumeLocale,
): Promise<ResumeFileResult> {
	return getResumeService().getResume(locale);
}
