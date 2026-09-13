import { beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryRateLimiter } from "./rate-limiter";

describe("InMemoryRateLimiter", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	it("allows requests within maximum limit", () => {
		const limiter = new InMemoryRateLimiter({
			maxRequests: 3,
			windowMs: 60_000,
		});

		expect(limiter.isRateLimited("192.168.1.1")).toBe(false);
		expect(limiter.isRateLimited("192.168.1.1")).toBe(false);
		expect(limiter.isRateLimited("192.168.1.1")).toBe(false);
	});

	it("blocks requests once maximum limit is exceeded", () => {
		const limiter = new InMemoryRateLimiter({
			maxRequests: 2,
			windowMs: 60_000,
		});

		expect(limiter.isRateLimited("10.0.0.1")).toBe(false);
		expect(limiter.isRateLimited("10.0.0.1")).toBe(false);
		// 3rd attempt exceeds limit
		expect(limiter.isRateLimited("10.0.0.1")).toBe(true);
	});

	it("resets count after window expires", () => {
		const limiter = new InMemoryRateLimiter({
			maxRequests: 2,
			windowMs: 10_000,
		});

		expect(limiter.isRateLimited("10.0.0.1")).toBe(false);
		expect(limiter.isRateLimited("10.0.0.1")).toBe(false);
		expect(limiter.isRateLimited("10.0.0.1")).toBe(true);

		// Advance time beyond windowMs
		vi.advanceTimersByTime(11_000);

		expect(limiter.isRateLimited("10.0.0.1")).toBe(false);
	});

	it("isolates limits across different client keys", () => {
		const limiter = new InMemoryRateLimiter({
			maxRequests: 1,
			windowMs: 60_000,
		});

		expect(limiter.isRateLimited("user-a")).toBe(false);
		expect(limiter.isRateLimited("user-a")).toBe(true);

		// user-b should still be allowed
		expect(limiter.isRateLimited("user-b")).toBe(false);
	});
});
