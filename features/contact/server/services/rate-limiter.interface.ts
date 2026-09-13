export interface RateLimiterOptions {
	windowMs: number;
	maxRequests: number;
}

export interface IRateLimiter {
	isRateLimited(key: string): boolean;
}

