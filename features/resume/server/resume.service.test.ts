import { beforeEach, describe, expect, it, vi } from "vitest";
import type { IGitHubService } from "@/lib/github/github.service.interface";
import { type IResumeService, ResumeService } from "./resume.service";

describe("ResumeService", () => {
	const mockFallbackBuffer = Buffer.from("%PDF-1.4 fallback mock");
	let mockGitHubService: { getFile: ReturnType<typeof vi.fn> };

	beforeEach(() => {
		mockGitHubService = {
			getFile: vi.fn(),
		};
	});

	it("returns remote PDF buffer when GitHubService returns a buffer", async () => {
		const samplePdfBuffer = Buffer.from("%PDF-1.4 remote pdf content");
		mockGitHubService.getFile.mockResolvedValue(samplePdfBuffer);

		const service: IResumeService = new ResumeService(
			mockGitHubService as unknown as IGitHubService,
			{
				readFallback: () => mockFallbackBuffer,
			},
		);

		const result = await service.getResume();

		expect(result.source).toBe("remote");
		expect(result.isFallback).toBe(false);
		expect(result.fileName).toBe("vitor-pires-resume-en.pdf");
		expect(result.contentType).toBe("application/pdf");
		expect(result.buffer.toString()).toContain("%PDF-1.4 remote pdf content");
		expect(mockGitHubService.getFile).toHaveBeenCalledWith(
			expect.any(String),
			expect.any(String),
			"vitor-pires-resume-en.pdf",
		);
	});

	it("falls back to local bundled PDF when GitHubService returns null", async () => {
		mockGitHubService.getFile.mockResolvedValue(null);

		const service: IResumeService = new ResumeService(
			mockGitHubService as unknown as IGitHubService,
			{
				readFallback: () => mockFallbackBuffer,
			},
		);

		const result = await service.getResume();

		expect(result.source).toBe("local-fallback");
		expect(result.isFallback).toBe(true);
		expect(result.fileName).toBe("vitor-pires-resume-en.pdf");
		expect(result.contentType).toBe("application/pdf");
		expect(result.buffer).toEqual(mockFallbackBuffer);
	});

	it("uses local fallback directly when GitHubService throws an error", async () => {
		mockGitHubService.getFile.mockRejectedValue(new Error("Network failure"));

		const service: IResumeService = new ResumeService(
			mockGitHubService as unknown as IGitHubService,
			{
				readFallback: () => mockFallbackBuffer,
			},
		);

		const result = await service.getResume();

		expect(result.source).toBe("local-fallback");
		expect(result.isFallback).toBe(true);
		expect(result.fileName).toBe("vitor-pires-resume-en.pdf");
		expect(result.buffer).toEqual(mockFallbackBuffer);
	});

	it("resolves pt-BR locale file name correctly", async () => {
		mockGitHubService.getFile.mockResolvedValue(null);

		const service: IResumeService = new ResumeService(
			mockGitHubService as unknown as IGitHubService,
			{
				readFallback: () => mockFallbackBuffer,
			},
		);

		const result = await service.getResume("pt-BR");

		expect(result.source).toBe("local-fallback");
		expect(result.fileName).toBe("vitor-pires-resume-pt-BR.pdf");
		expect(result.buffer).toEqual(mockFallbackBuffer);
	});
});
