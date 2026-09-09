export interface RateLimiterOptions {
	windowMs: number;
	maxRequests: number;
}

export interface IRateLimiter {
	isRateLimited(key: string): boolean;
}

interface RateLimitEntry {
	count: number;
	resetAt: number;
}

export class InMemoryRateLimiter implements IRateLimiter {
	private readonly records = new Map<string, RateLimitEntry>();
	private readonly windowMs: number;
	private readonly maxRequests: number;

	constructor(
		options: RateLimiterOptions = { windowMs: 10 * 60 * 1000, maxRequests: 5 },
	) {
		this.windowMs = options.windowMs;
		this.maxRequests = options.maxRequests;
	}

	isRateLimited(key: string): boolean {
		const now = Date.now();
		const entry = this.records.get(key);

		if (!entry || now > entry.resetAt) {
			this.records.set(key, {
				count: 1,
				resetAt: now + this.windowMs,
			});
			return false;
		}

		if (entry.count >= this.maxRequests) {
			return true;
		}

		entry.count += 1;
		return false;
	}
}

export const contactRateLimiter = new InMemoryRateLimiter();
