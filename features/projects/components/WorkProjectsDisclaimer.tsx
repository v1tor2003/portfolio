import { ShieldAlert } from "lucide-react";

export function WorkProjectsDisclaimer() {
	return (
		<div className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-5 font-mono space-y-3 shadow-lg backdrop-blur-sm">
			<div className="flex items-center space-x-2 text-xs">
				<ShieldAlert className="h-4 w-4 text-amber-400 shrink-0" />
				<span className="text-amber-400/90 font-semibold tracking-wide uppercase">
					RESTRICTED ACCESS
				</span>
			</div>

			<h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
				Enterprise Architecture & Reference Implementations
			</h3>

			<p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-4xl">
				Due to confidentiality agreements, enterprise NDAs, and proprietary
				source code restrictions, direct production repositories cannot be
				publicly disclosed. The projects listed below are
				architecture-equivalent reference implementations reflecting the
				real-world distributed architectures, cloud pipelines (AWS S3, SQS, SNS,
				SES, Kinesis, DynamoDB, RDS, CloudWatch), and event-driven microservices
				engineered in production.
			</p>
		</div>
	);
}
