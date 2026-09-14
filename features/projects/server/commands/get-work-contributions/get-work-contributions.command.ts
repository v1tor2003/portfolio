import { BaseRequest, type HttpRequestContext } from "@v1tor2003/command-api";

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

export class GetWorkContributionsCommand extends BaseRequest<
	void,
	GraphQLWorkContributionsResponse
> {
	constructor() {
		super(undefined);
	}

	toHttp(): HttpRequestContext {
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

		return {
			method: "POST",
			path: "/graphql",
			headers: {
				"Content-Type": "application/json",
			},
			body: { query },
		};
	}
}
