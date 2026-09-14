import { BaseRequest, type HttpRequestContext } from "@v1tor2003/command-api";

export interface GetPinnedRepoNamesInput {
	username: string;
}

export interface GraphQLPinnedReposResponse {
	data?: {
		user?: {
			pinnedItems?: {
				nodes?: Array<{
					name?: string;
				}>;
			};
		};
	};
}

export class GetPinnedRepoNamesCommand extends BaseRequest<
	GetPinnedRepoNamesInput,
	GraphQLPinnedReposResponse
> {
	toHttp(): HttpRequestContext {
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

		return {
			method: "POST",
			path: "/graphql",
			headers: {
				"Content-Type": "application/json",
			},
			body: {
				query,
				variables: { username: this.input.username },
			},
		};
	}
}
