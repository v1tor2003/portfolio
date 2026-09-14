import type { BaseRequest, HttpRequestContext } from "@v1tor2003/command-api";
import { describe, expect, it, vi } from "vitest";
import { createAuthMiddleware } from "./auth.middleware";

describe("createAuthMiddleware", () => {
	const dummyCommand = {} as BaseRequest<unknown, unknown>;

	it("injects Bearer token header when token string is supplied", async () => {
		const middleware = createAuthMiddleware("ghp_test123");
		const ctx: HttpRequestContext = {
			method: "GET",
			path: "/user",
			headers: { Accept: "application/json" },
		};
		const next = vi.fn().mockResolvedValue({ status: 200 });

		await middleware(ctx, next, dummyCommand);

		expect(ctx.headers?.Authorization).toBe("Bearer ghp_test123");
		expect(next).toHaveBeenCalledOnce();
	});

	it("resolves token dynamically from getter function", async () => {
		let currentToken: string | undefined = "token-1";
		const middleware = createAuthMiddleware(() => currentToken);
		const ctx: HttpRequestContext = {
			method: "GET",
			path: "/user",
			headers: {},
		};
		const next = vi.fn().mockResolvedValue({ status: 200 });

		await middleware(ctx, next, dummyCommand);
		expect(ctx.headers?.Authorization).toBe("Bearer token-1");

		currentToken = "token-2";
		await middleware(ctx, next, dummyCommand);
		expect(ctx.headers?.Authorization).toBe("Bearer token-2");
	});

	it("proceeds without Authorization header if token is undefined", async () => {
		const middleware = createAuthMiddleware(undefined);
		const ctx: HttpRequestContext = {
			method: "GET",
			path: "/repos",
			headers: { Accept: "application/json" },
		};
		const next = vi.fn().mockResolvedValue({ status: 200 });

		await middleware(ctx, next, dummyCommand);

		expect(ctx.headers?.Authorization).toBeUndefined();
		expect(next).toHaveBeenCalledOnce();
	});
});
