import type { ApiClient } from "@v1tor2003/command-api";
import { err, ok } from "@v1tor2003/command-api";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { type IResumeService, ResumeService } from "./resume.service";

describe("ResumeService", () => {
	const mockFallbackBuffer = Buffer.from("%PDF-1.4 fallback mock");
	let mockClient: { send: ReturnType<typeof vi.fn> };

	beforeEach(() => {
		mockClient = {
			send: vi.fn(),
		};
	});

	it("returns remote PDF buffer when GitHub API succeeds with base64 content", async () => {
		const samplePdfContent = Buffer.from(
			"%PDF-1.4 remote pdf content",
		).toString("base64");
		mockClient.send.mockResolvedValue(
			ok({
				name: "vitor-pires-resume.pdf",
				path: "vitor-pires-resume.pdf",
				sha: "abc123sha",
				size: 100,
				encoding: "base64",
				content: samplePdfContent,
			}),
		);

		const service: IResumeService = new ResumeService({
			client: mockClient as unknown as ApiClient,
			readFallback: () => mockFallbackBuffer,
			token: "test-token",
		});

		const result = await service.getResume();

		expect(result.source).toBe("remote");
		expect(result.isFallback).toBe(false);
		expect(result.fileName).toBe("vitor-pires-resume-en.pdf");
		expect(result.contentType).toBe("application/pdf");
		expect(result.buffer.toString()).toContain("%PDF-1.4 remote pdf content");
		expect(mockClient.send).toHaveBeenCalledTimes(1);
	});

	it("falls back to local bundled PDF when remote API call fails", async () => {
		mockClient.send.mockResolvedValue(err(new Error("GitHub 404 Not Found")));

		const service: IResumeService = new ResumeService({
			client: mockClient as unknown as ApiClient,
			readFallback: () => mockFallbackBuffer,
			token: "test-token",
		});

		const result = await service.getResume();

		expect(result.source).toBe("local-fallback");
		expect(result.isFallback).toBe(true);
		expect(result.fileName).toBe("vitor-pires-resume-en.pdf");
		expect(result.contentType).toBe("application/pdf");
		expect(result.buffer).toEqual(mockFallbackBuffer);
	});

	it("uses local fallback directly without remote call when token is missing", async () => {
		const service: IResumeService = new ResumeService({
			client: mockClient as unknown as ApiClient,
			readFallback: () => mockFallbackBuffer,
			token: undefined,
		});

		const result = await service.getResume();

		expect(result.source).toBe("local-fallback");
		expect(result.isFallback).toBe(true);
		expect(result.fileName).toBe("vitor-pires-resume-en.pdf");
		expect(result.buffer).toEqual(mockFallbackBuffer);
		expect(mockClient.send).not.toHaveBeenCalled();
	});

	it("resolves pt-BR locale file name correctly", async () => {
		const service: IResumeService = new ResumeService({
			client: mockClient as unknown as ApiClient,
			readFallback: () => mockFallbackBuffer,
			token: undefined,
		});

		const result = await service.getResume("pt-BR");

		expect(result.source).toBe("local-fallback");
		expect(result.fileName).toBe("vitor-pires-resume-pt-BR.pdf");
		expect(result.buffer).toEqual(mockFallbackBuffer);
	});
});
