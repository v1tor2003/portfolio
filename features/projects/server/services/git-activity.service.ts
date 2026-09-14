import { inject, injectable } from "inversify";
import { DI_TYPES } from "@/lib/di/types";
import { env } from "@/lib/env";
import type { IGitHubService } from "@/lib/github/github.service.interface";
import { generateGitActivityData } from "../../data/projects-seed.data";
import type { GitActivityData, GitActivityDay } from "../../schemas/project.schema";
import type { IGitActivityService } from "./git-activity.service.interface";

const CACHE_TTL_MS = 1000 * 60 * 15; // 15 minutes
const ACTIVITY_WEEKS = 52;

@injectable()
export class GitActivityService implements IGitActivityService {
	private cachedActivity: { data: GitActivityData; timestamp: number } | null = null;

	constructor(
		@inject(DI_TYPES.IGitHubService)
		private readonly gitHubService: IGitHubService,
		private readonly username: string = env.GITHUB_PERSONAL_USERNAME,
		private readonly workUsername: string = env.GITHUB_WORK_USERNAME,
	) {}

	async getGitActivity(): Promise<GitActivityData> {
		if (this.isCacheValid()) return this.cachedActivity!.data;

		const activity = await this.fetchLiveActivity();
		const result = activity ?? generateGitActivityData(ACTIVITY_WEEKS);
		this.updateCache(result);
		return result;
	}

	private isCacheValid(): boolean {
		if (!this.cachedActivity) return false;
		return Date.now() - this.cachedActivity.timestamp < CACHE_TTL_MS;
	}

	private updateCache(data: GitActivityData): void {
		this.cachedActivity = { data, timestamp: Date.now() };
	}

	private async fetchLiveActivity(): Promise<GitActivityData | null> {
		const [personalContributions, realWorkMap] = await Promise.all([
			this.gitHubService.getPersonalContributions(this.username),
			this.gitHubService.getWorkContributions(this.workUsername),
		]);

		const hasContributions = personalContributions.length > 0 || realWorkMap.size > 0;
		if (!hasContributions) return null;

		return this.mergeContributions(personalContributions, ACTIVITY_WEEKS, realWorkMap);
	}

	private mergeContributions(
		contributions: Array<{ date: string; count: number }>,
		weeks: number,
		realWorkContributionsMap?: Map<string, number> | null,
	): GitActivityData {
		const contributionMap = new Map(contributions.map((c) => [c.date, c.count]));
		const hasPersonal = contributions.length > 0;
		const today = new Date();
		const days: GitActivityDay[] = [];
		let totalPersonal = 0;
		let totalWork = 0;

		for (let i = weeks * 7 - 1; i >= 0; i--) {
			const date = new Date(today);
			date.setDate(date.getDate() - i);
			const dateStr = date.toISOString().split("T")[0];
			const dayOfWeek = date.getDay();

			const personalCount = this.computePersonalCount(dateStr, dayOfWeek, contributionMap, hasPersonal);
			const workCount = this.computeWorkCount(dateStr, dayOfWeek, realWorkContributionsMap);

			totalPersonal += personalCount;
			totalWork += workCount;

			days.push({
				date: dateStr,
				count: personalCount + workCount,
				category: this.resolveCategory(personalCount, workCount),
			});
		}

		return { days, totalPersonal, totalWork };
	}

	private computePersonalCount(
		dateStr: string,
		dayOfWeek: number,
		contributionMap: Map<string, number>,
		hasPersonal: boolean,
	): number {
		if (hasPersonal) return contributionMap.get(dateStr) ?? 0;

		return this.generateSyntheticPersonalCount(dateStr, dayOfWeek);
	}

	private generateSyntheticPersonalCount(dateStr: string, dayOfWeek: number): number {
		const seed = dateStr
			.split("-")
			.reduce((acc, part) => acc * 31 + Number.parseInt(part, 10), 13);
		const absRand = Math.abs((Math.sin(seed) * 10000) % 1);

		const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
		if (isWeekend && absRand > 0.4) return Math.floor(absRand * 6) + 1;
		if (!isWeekend && absRand > 0.7) return Math.floor(absRand * 3) + 1;
		
		return 0;
	}

	private computeWorkCount(
		dateStr: string,
		dayOfWeek: number,
		realWorkContributionsMap?: Map<string, number> | null,
	): number {
		if (realWorkContributionsMap?.has(dateStr))
			return realWorkContributionsMap.get(dateStr) ?? 0;

		const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
		if (isWeekend) return 0;

		const seed = dateStr
			.split("-")
			.reduce((acc, part) => acc * 31 + Number.parseInt(part, 10), 7);
		const absRand = Math.abs((Math.sin(seed) * 10000) % 1);
		return absRand > 0.25 ? Math.floor(absRand * 8) + 2 : 0;
	}

	private resolveCategory(personal: number, work: number): GitActivityDay["category"] {
		if (personal > 0 && work > 0) return "mixed";
		if (personal > 0) return "personal";
		if (work > 0) return "work";

		return "none";
	}
}

