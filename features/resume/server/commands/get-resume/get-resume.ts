import { DI_TYPES } from "@/lib/di/types";
import { resolveService } from "@/lib/di/config";
import type {
	IResumeService,
	ResumeFileResult,
	ResumeLocale,
} from "../../resume.service.interface";

export async function getResume(
	locale?: ResumeLocale,
): Promise<ResumeFileResult> {
	const service = resolveService<IResumeService>(DI_TYPES.IResumeService);
	return service.getResume(locale);
}
