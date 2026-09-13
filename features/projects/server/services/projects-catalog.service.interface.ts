import type {
	Project,
	ProjectCategory,
} from "../../schemas/project.schema";
import type {
	PaginatedProjectsOptions,
	PaginatedProjectsResult,
} from "./projects.service.interface";

export interface IProjectsCatalogService {
	getProjects(category?: ProjectCategory): Promise<Project[]>;
	getPaginatedProjects(
		options?: PaginatedProjectsOptions,
	): Promise<PaginatedProjectsResult>;
	getReadme(owner: string, repo: string): Promise<string>;
}

