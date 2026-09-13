import { NextResponse } from "next/server";
import { z } from "zod";
import type { IProjectsService } from "@/features/projects";
import { resolveService } from "@/lib/di/config";
import { DI_TYPES } from "@/lib/di/types";

const ProjectsQuerySchema = z.object({
	category: z.enum(["personal", "work"]).default("personal"),
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(50).default(9),
});

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	const parsedQuery = ProjectsQuerySchema.safeParse({
		category: searchParams.get("category") ?? undefined,
		page: searchParams.get("page") ?? undefined,
		limit: searchParams.get("limit") ?? undefined,
	});

	if (!parsedQuery.success) {
		return NextResponse.json(
			{
				error: "Invalid query parameters.",
				details: parsedQuery.error.flatten(),
			},
			{ status: 400 },
		);
	}

	try {
		const service = resolveService<IProjectsService>(DI_TYPES.IProjectsService);
		const result = await service.getPaginatedProjects(parsedQuery.data);

		return NextResponse.json(result, {
			status: 200,
			headers: {
				"Cache-Control": "public, s-maxage=900, stale-while-revalidate=60",
			},
		});
	} catch {
		return NextResponse.json(
			{ error: "Failed to fetch projects." },
			{ status: 500 },
		);
	}
}
