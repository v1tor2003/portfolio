import { NextResponse } from "next/server";
import { getProjectsService } from "@/features/projects/server/projects.service";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const owner = searchParams.get("owner");
	const repo = searchParams.get("repo");

	if (!owner || !repo) {
		return NextResponse.json(
			{ error: "Both 'owner' and 'repo' query parameters are required." },
			{ status: 400 },
		);
	}

	try {
		const service = getProjectsService();
		const content = await service.getReadme(owner, repo);

		return NextResponse.json(
			{ content },
			{
				status: 200,
				headers: {
					"Cache-Control":
						"public, s-maxage=3600, stale-while-revalidate=86400",
				},
			},
		);
	} catch {
		return NextResponse.json(
			{ error: "Failed to load project README." },
			{ status: 500 },
		);
	}
}
