import type { Middleware } from "@v1tor2003/command-api";

export function createAuthMiddleware(
	tokenOrGetter?: string | (() => string | undefined),
): Middleware {
	return async (ctx, next) => {
		const token =
			typeof tokenOrGetter === "function" ? tokenOrGetter() : tokenOrGetter;
	
		if (token)
			ctx.headers = {
				...ctx.headers,
				Authorization: `Bearer ${token}`,
			};
		

		return next();
	};
}
