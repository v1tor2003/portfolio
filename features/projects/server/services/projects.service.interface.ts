import type {
	GitActivityData,
	Project,
	ProjectCategory,
} from "../../schemas/project.schema";

export interface PaginatedProjectsResult {
	projects: Project[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export interface PaginatedProjectsOptions {
	category?: ProjectCategory;
	page?: number;
	limit?: number;
}

export interface IProjectsService {
	getProjects(category?: ProjectCategory): Promise<Project[]>;
	getPaginatedProjects(
		options?: PaginatedProjectsOptions,
	): Promise<PaginatedProjectsResult>;
	getGitActivity(): Promise<GitActivityData>;
	getReadme(owner: string, repo: string): Promise<string>;
}

