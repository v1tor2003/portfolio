"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, FileText, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface ProjectReadmeModalProps {
	isOpen: boolean;
	onClose: () => void;
	owner: string;
	repo: string;
	title?: string;
}

const MotionDiv = motion.div as React.ComponentType<{
	initial?: Record<string, unknown>;
	animate?: Record<string, unknown>;
	exit?: Record<string, unknown>;
	transition?: Record<string, unknown>;
	className?: string;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
	children?: React.ReactNode;
}>;

export function ProjectReadmeModal({
	isOpen,
	onClose,
	owner,
	repo,
	title,
}: ProjectReadmeModalProps) {
	const [content, setContent] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [copied, setCopied] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!isOpen) {
			setContent("");
			setError(null);
			return;
		}

		let isMounted = true;
		setLoading(true);
		setError(null);

		fetch(
			`/api/projects/readme?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`,
		)
			.then(async (res) => {
				if (!res.ok) throw new Error("Failed to load README");
				return res.json();
			})
			.then((data) => {
				if (isMounted) {
					setContent(
						data.content || "No README available for this repository.",
					);
					setLoading(false);
				}
			})
			.catch((err) => {
				if (isMounted) {
					setError(err.message || "Could not retrieve repository README.");
					setLoading(false);
				}
			});

		return () => {
			isMounted = false;
		};
	}, [isOpen, owner, repo]);

	// Handle escape key
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				onClose();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose]);

	// Lock body scroll when modal is open
	useEffect(() => {
		if (!isOpen) return;

		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = originalOverflow;
		};
	}, [isOpen]);

	const handleCopy = async () => {
		if (!content) return;
		try {
			await navigator.clipboard.writeText(content);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Clipboard write fallback
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<MotionDiv
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
					onClick={onClose}
				>
					<MotionDiv
						initial={{ opacity: 0, scale: 0.95, y: 10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 10 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						onClick={(e: React.MouseEvent<HTMLDivElement>) =>
							e.stopPropagation()
						}
						className="w-full max-w-4xl max-h-[85vh] flex flex-col bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl font-mono overflow-hidden"
					>
						{/* Terminal Window Header */}
						<div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 select-none">
							<div className="flex items-center space-x-2 text-xs sm:text-sm text-zinc-300 truncate">
								<FileText className="h-4 w-4 text-emerald-400 shrink-0" />
								<span className="truncate">
									~/{owner}/{repo}/README.md
								</span>
								{title && (
									<span className="hidden sm:inline text-zinc-500">
										— {title}
									</span>
								)}
							</div>

							<div className="flex items-center space-x-2">
								<button
									type="button"
									onClick={handleCopy}
									disabled={loading || !content}
									aria-label="Copy README markdown"
									className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 rounded border border-zinc-700/50 transition-colors disabled:opacity-40"
								>
									{copied ? (
										<>
											<Check className="h-3 w-3 text-emerald-400" />
											<span className="text-emerald-400">COPIED</span>
										</>
									) : (
										<>
											<Copy className="h-3 w-3" />
											<span className="hidden sm:inline">RAW</span>
										</>
									)}
								</button>

								<button
									type="button"
									onClick={onClose}
									aria-label="Close modal"
									className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
								>
									<X className="h-4 w-4" />
								</button>
							</div>
						</div>

						{/* Content Terminal Body */}
						<div className="flex-1 overflow-y-auto p-4 sm:p-6 text-xs sm:text-sm text-zinc-300 leading-relaxed scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
							{loading && (
								<div className="flex flex-col items-center justify-center py-20 space-y-3 text-zinc-500">
									<Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
									<p className="text-xs">ACCESSING REPOSITORY ARCHIVE...</p>
								</div>
							)}

							{error && !loading && (
								<div className="p-4 rounded border border-red-500/30 bg-red-950/20 text-red-400 text-xs">
									<p className="font-semibold">FETCH_ERROR: {error}</p>
									<p className="mt-1 text-zinc-500">
										Please visit the repository directly on GitHub.
									</p>
								</div>
							)}

							{!loading && !error && (
								<div className="space-y-4 font-mono">
									<ReactMarkdown
										components={{
											h1: ({ children }) => (
												<h1 className="text-xl sm:text-2xl font-bold text-white border-b border-zinc-800 pb-2 pt-1">
													{children}
												</h1>
											),
											h2: ({ children }) => (
												<h2 className="text-lg sm:text-xl font-bold text-emerald-400 border-b border-zinc-800/80 pb-1.5 pt-4">
													{children}
												</h2>
											),
											h3: ({ children }) => (
												<h3 className="text-base font-semibold text-zinc-200 pt-3">
													{children}
												</h3>
											),
											p: ({ children }) => (
												<p className="leading-relaxed text-zinc-300">
													{children}
												</p>
											),
											ul: ({ children }) => (
												<ul className="list-disc list-inside space-y-1 pl-2 text-zinc-300">
													{children}
												</ul>
											),
											ol: ({ children }) => (
												<ol className="list-decimal list-inside space-y-1 pl-2 text-zinc-300">
													{children}
												</ol>
											),
											blockquote: ({ children }) => (
												<blockquote className="border-l-2 border-emerald-500/60 pl-3 italic text-zinc-400 bg-emerald-950/20 py-1 rounded-r">
													{children}
												</blockquote>
											),
											code: ({ children, className }) => {
												const isInline = !className;
												if (isInline) {
													return (
														<code className="bg-zinc-900 border border-zinc-800 text-emerald-300 px-1.5 py-0.5 rounded text-[11px] sm:text-xs">
															{children}
														</code>
													);
												}
												return (
													<div className="bg-zinc-900/90 border border-zinc-800 rounded p-3 overflow-x-auto my-3 text-xs sm:text-sm">
														<code className="text-emerald-400 font-mono">
															{children}
														</code>
													</div>
												);
											},
											a: ({ href, children }) => (
												<a
													href={href}
													target="_blank"
													rel="noopener noreferrer"
													className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors"
												>
													{children}
												</a>
											),
										}}
									>
										{content}
									</ReactMarkdown>
								</div>
							)}
						</div>

						{/* Terminal Footer */}
						<div className="px-4 py-2 bg-zinc-900/60 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
							<div className="flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-emerald-400" />
								<span>STATUS: SYNCHRONIZED</span>
							</div>
							<span>PRESS [ESC] TO CLOSE</span>
						</div>
					</MotionDiv>
				</MotionDiv>
			)}
		</AnimatePresence>
	);
}
