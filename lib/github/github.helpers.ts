import { isOk, type Result } from "@v1tor2003/command-api";

interface Base64Container {
	content?: string;
	encoding?: string;
}

export function decodeBase64Result(
	result: Result<Base64Container, Error>,
): string | null {
	if (!isOk(result) || !result.data) return null;
	const { content, encoding } = result.data;
	if (!content || encoding !== "base64") return null;

	const clean = content.replace(/\s+/g, "");
	return Buffer.from(clean, "base64").toString("utf-8");
}

export function decodeBase64Buffer(
	result: Result<Base64Container, Error>,
): Buffer | null {
	if (!isOk(result) || !result.data) return null;
	const { content, encoding } = result.data;
	if (!content || encoding !== "base64") return null;

	const clean = content.replace(/\s+/g, "");
	return Buffer.from(clean, "base64");
}

export async function fetchPinnedRepoNamesFromScraping(
	username: string,
): Promise<Set<string>> {
	const names = new Set<string>();
	const res = await fetch(`https://github.com/${username}`, {
		headers: { "User-Agent": "vitor-portfolio-app" },
	});
	if (!res.ok) return names;

	const html = await res.text();
	const regex = new RegExp(
		`class="pinned-item-list-item-content"[\\s\\S]*?href="/${username}/([^"/]+)"`,
		"g",
	);
	for (const match of html.matchAll(regex)) {
		if (match[1] && match[1].toLowerCase() !== username.toLowerCase()) {
			names.add(match[1].toLowerCase());
		}
	}
	return names;
}
