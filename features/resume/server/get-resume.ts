import { getResumeService, type ResumeFileResult } from "./resume.service";

export async function getResume(): Promise<ResumeFileResult> {
	return getResumeService().getResume();
}
