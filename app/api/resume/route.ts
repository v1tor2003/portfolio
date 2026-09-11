import { getResume } from "@/features/resume/server/get-resume";

export async function GET(request: Request): Promise<Response> {
	try {
		const { searchParams } = new URL(request.url);
		const isDownload = searchParams.get("download") === "true";
		const rawLocale = searchParams.get("locale");
		const locale = rawLocale === "pt-BR" ? "pt-BR" : "en";

		const resume = await getResume(locale);
		const dispositionType = isDownload ? "attachment" : "inline";

		return new Response(new Uint8Array(resume.buffer), {
			status: 200,
			headers: {
				"Content-Type": resume.contentType,
				"Content-Disposition": `${dispositionType}; filename="${resume.fileName}"`,
				"Content-Length": String(resume.size),
				"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
				"X-Resume-Source": resume.source,
			},
		});
	} catch {
		return new Response("Resume unavailable", {
			status: 500,
			headers: { "Content-Type": "text/plain" },
		});
	}
}
