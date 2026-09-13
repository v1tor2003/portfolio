import type { GitActivityData } from "../../schemas/project.schema";

export interface IGitActivityService {
	getGitActivity(): Promise<GitActivityData>;
}

