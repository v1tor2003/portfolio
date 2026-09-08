"use client";

import { useCallback, useState, useTransition } from "react";
import {
	type ContactActionResult,
	sendContactEmail,
} from "../server/send-contact-email";

export interface UseEmailSenderReturn {
	sendEmail: (data: unknown) => Promise<ContactActionResult>;
	isPending: boolean;
	result: ContactActionResult | null;
	reset: () => void;
}

export function useEmailSender(): UseEmailSenderReturn {
	const [isPending, startTransition] = useTransition();
	const [result, setResult] = useState<ContactActionResult | null>(null);

	const sendEmail = useCallback(
		async (data: unknown): Promise<ContactActionResult> => {
			let res: ContactActionResult = {
				success: false,
				message: "Transmission aborted.",
			};

			await new Promise<void>((resolve) => {
				startTransition(async () => {
					res = await sendContactEmail(data);
					setResult(res);
					resolve();
				});
			});

			return res;
		},
		[],
	);

	const reset = useCallback(() => {
		setResult(null);
	}, []);

	return {
		sendEmail,
		isPending,
		result,
		reset,
	};
}
