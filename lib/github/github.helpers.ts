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

export async function fetchPinnedRepoNamesFromGraphQL(
	username: string,
	token: string,
): Promise<Set<string>> {
	const names = new Set<string>();
	const query = `
		query($username: String!) {
			user(login: $username) {
				pinnedItems(first: 10, types: REPOSITORY) {
					nodes {
						... on Repository {
							name
						}
					}
				}
			}
		}
	`;

	const res = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			"User-Agent": "vitor-portfolio-app",
		},
		body: JSON.stringify({ query, variables: { username } }),
	});

	if (!res.ok) return names;
	const json = await res.json();
	const nodes = json.data?.user?.pinnedItems?.nodes;
	if (Array.isArray(nodes)) {
		for (const node of nodes) {
			if (node?.name) {
				names.add(node.name.toLowerCase());
			}
		}
	}
	return names;
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

export interface GraphQLWorkContributionsResponse {
	data?: {
		viewer?: {
			contributionsCollection?: {
				contributionCalendar?: {
					weeks?: Array<{
						contributionDays?: Array<{
							date: string;
							contributionCount: number;
						}>;
					}>;
				};
			};
		};
	};
}

export async function fetchGraphQLWorkContributions(
	workToken: string,
): Promise<GraphQLWorkContributionsResponse | null> {
	const query = `
		query {
			viewer {
				contributionsCollection {
					contributionCalendar {
						weeks {
							contributionDays {
								date
								contributionCount
							}
						}
					}
				}
			}
		}
	`;
	const res = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			Authorization: `bearer ${workToken}`,
			"User-Agent": "vitor-portfolio-app",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query }),
	});

	if (!res.ok) return null;
	return (await res.json()) as GraphQLWorkContributionsResponse;
}
