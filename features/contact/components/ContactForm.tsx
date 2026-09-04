"use client";

import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { useState, useTransition } from "react";
import { type ContactFormData, contactSchema } from "../schemas/contact.schema";
import { sendContactEmail } from "../server/send-contact-email";

export function ContactForm() {
	const [isPending, startTransition] = useTransition();
	const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
	const [statusMessage, setStatusMessage] = useState<string>("");
	const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

	const [formData, setFormData] = useState<ContactFormData>({
		name: "",
		email: "",
		subject: "",
		message: "",
		botField: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (fieldErrors[name]) {
			setFieldErrors((prev) => {
				const updated = { ...prev };
				delete updated[name];
				return updated;
			});
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("idle");
		setFieldErrors({});

		const clientValidation = contactSchema.safeParse(formData);
		if (!clientValidation.success) {
			setFieldErrors(clientValidation.error.flatten().fieldErrors);
			setStatus("error");
			setStatusMessage("Please correct validation errors before transmitting.");
			return;
		}

		startTransition(async () => {
			try {
				const result = await sendContactEmail(formData);
				if (result.success) {
					setStatus("success");
					setStatusMessage(
						result.message ||
							"Transmission successful. Packet received by gateway.",
					);
					setFormData({
						name: "",
						email: "",
						subject: "",
						message: "",
						botField: "",
					});
				} else {
					setStatus("error");
					setStatusMessage(
						result.message || "Transmission rejected by server gateway.",
					);
					if (result.errors) {
						setFieldErrors(result.errors);
					}
				}
			} catch {
				setStatus("error");
				setStatusMessage("Network timeout: Unable to reach transmission host.");
			}
		});
	};

	return (
		<div className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-5 font-mono backdrop-blur-sm">
			<div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-5 text-xs text-zinc-500">
				<div className="flex items-center space-x-2">
					<span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
					<span>TERMINAL_TRANSMITTER [ TCP / PORT: 443 ]</span>
				</div>
				<span className="text-[10px] text-zinc-600">ENCRYPTION: TLS_1.3</span>
			</div>

			<form noValidate onSubmit={handleSubmit} className="space-y-4 text-xs">
				{/* Hidden Honeypot */}
				<input
					type="text"
					name="botField"
					value={formData.botField}
					onChange={handleChange}
					tabIndex={-1}
					aria-hidden="true"
					className="hidden"
					autoComplete="off"
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="space-y-1.5">
						<label htmlFor="contact-name" className="text-zinc-400">
							NAME <span className="text-zinc-600">*</span>
						</label>
						<input
							id="contact-name"
							name="name"
							type="text"
							value={formData.name}
							onChange={handleChange}
							placeholder="e.g. Linus Torvalds"
							required
							className="w-full rounded border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-white placeholder:text-zinc-600 focus:border-white focus:outline-none transition-colors"
						/>
						{fieldErrors.name && (
							<p className="text-rose-400 text-[11px]">{fieldErrors.name[0]}</p>
						)}
					</div>

					<div className="space-y-1.5">
						<label htmlFor="contact-email" className="text-zinc-400">
							EMAIL <span className="text-zinc-600">*</span>
						</label>
						<input
							id="contact-email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="e.g. linus@kernel.org"
							required
							className="w-full rounded border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-white placeholder:text-zinc-600 focus:border-white focus:outline-none transition-colors"
						/>
						{fieldErrors.email && (
							<p className="text-rose-400 text-[11px]">
								{fieldErrors.email[0]}
							</p>
						)}
					</div>
				</div>

				<div className="space-y-1.5">
					<label htmlFor="contact-subject" className="text-zinc-400">
						SUBJECT <span className="text-zinc-600">*</span>
					</label>
					<input
						id="contact-subject"
						name="subject"
						type="text"
						value={formData.subject}
						onChange={handleChange}
						placeholder="e.g. Distributed System Architecture Inquiry"
						required
						className="w-full rounded border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-white placeholder:text-zinc-600 focus:border-white focus:outline-none transition-colors"
					/>
					{fieldErrors.subject && (
						<p className="text-rose-400 text-[11px]">
							{fieldErrors.subject[0]}
						</p>
					)}
				</div>

				<div className="space-y-1.5">
					<label htmlFor="contact-message" className="text-zinc-400">
						MESSAGE_PAYLOAD <span className="text-zinc-600">*</span>
					</label>
					<textarea
						id="contact-message"
						name="message"
						rows={4}
						value={formData.message}
						onChange={handleChange}
						placeholder="Enter message or role specifications..."
						required
						className="w-full rounded border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-white placeholder:text-zinc-600 focus:border-white focus:outline-none transition-colors resize-y"
					/>
					{fieldErrors.message && (
						<p className="text-rose-400 text-[11px]">
							{fieldErrors.message[0]}
						</p>
					)}
				</div>

				{status === "success" && (
					<div className="flex items-center space-x-2 rounded border border-emerald-900/60 bg-emerald-950/30 p-3 text-emerald-400">
						<CheckCircle2 className="h-4 w-4 shrink-0" />
						<span>{statusMessage}</span>
					</div>
				)}

				{status === "error" && (
					<div className="flex items-center space-x-2 rounded border border-rose-900/60 bg-rose-950/30 p-3 text-rose-400">
						<AlertCircle className="h-4 w-4 shrink-0" />
						<span>{statusMessage}</span>
					</div>
				)}

				<div className="pt-2 flex justify-end">
					<button
						type="submit"
						disabled={isPending}
						className="flex items-center space-x-2 rounded border border-zinc-700 bg-white px-4 py-2 text-black font-semibold hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<Send className="h-3.5 w-3.5" />
						<span>{isPending ? "[TRANSMITTING...]" : "[TRANSMIT_PACKET]"}</span>
					</button>
				</div>
			</form>
		</div>
	);
}
