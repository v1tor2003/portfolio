import { inject, injectable } from "inversify";
import { DI_TYPES } from "@/lib/di/types";
import type {
	GitActivityData,
	Project,
	ProjectCategory,
} from "../../schemas/project.schema";
import type {
	IProjectsService,
	PaginatedProjectsOptions,
	PaginatedProjectsResult,
} from "./projects.service.interface";
import type { IGitActivityService } from "./git-activity.service.interface";
import type { IProjectsCatalogService } from "./projects-catalog.service.interface";

export type {
	IProjectsService,
	PaginatedProjectsOptions,
	PaginatedProjectsResult,
};

@injectable()
export class ProjectsService implements IProjectsService {
	constructor(
		@inject(DI_TYPES.IProjectsCatalogService)
		private readonly catalogService: IProjectsCatalogService,
		@inject(DI_TYPES.IGitActivityService)
		private readonly activityService: IGitActivityService,
	) {}

	async getProjects(category?: ProjectCategory): Promise<Project[]> {
		return this.catalogService.getProjects(category);
	}

	async getPaginatedProjects(
		options?: PaginatedProjectsOptions,
	): Promise<PaginatedProjectsResult> {
		return this.catalogService.getPaginatedProjects(options);
	}

	async getGitActivity(): Promise<GitActivityData> {
		return this.activityService.getGitActivity();
	}

	async getReadme(owner: string, repo: string): Promise<string> {
		return this.catalogService.getReadme(owner, repo);
	}
}
