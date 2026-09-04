import { Globe, Mail, MapPin } from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			className="h-4 w-4 fill-current"
			viewBox="0 0 24 24"
			aria-hidden="true"
			{...props}
		>
			<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
		</svg>
	);
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			className="h-4 w-4 fill-current"
			viewBox="0 0 24 24"
			aria-hidden="true"
			{...props}
		>
			<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
		</svg>
	);
}

export const CONTACT_LINKS = [
	{
		label: "EMAIL",
		value: "vitor.pr04@hotmail.com",
		href: "mailto:vitor.pr04@hotmail.com",
		icon: Mail,
	},
	{
		label: "LINKEDIN",
		value: "linkedin.com/in/vitor-pires",
		href: "https://linkedin.com/in/vitor-pires",
		icon: LinkedinIcon,
	},
	{
		label: "GITHUB",
		value: "github.com/v1tor2003",
		href: "https://github.com/v1tor2003",
		icon: GithubIcon,
	},
];

export function ContactChannels() {
	return (
		<div className="space-y-6 font-mono">
			<div className="space-y-2">
				<div className="text-xs text-zinc-500 font-semibold tracking-wider">
					[ DIRECT_COMMUNICATION_CHANNELS ]
				</div>
				<p className="text-sm text-zinc-400 leading-relaxed">
					Feel free to reach out directly through any of the secure channels
					below or transmit a packet using the terminal form.
				</p>
			</div>

			<div className="space-y-3">
				{CONTACT_LINKS.map((link) => {
					const Icon = link.icon;
					return (
						<a
							key={link.label}
							href={link.href}
							target={link.href.startsWith("http") ? "_blank" : undefined}
							rel={
								link.href.startsWith("http") ? "noopener noreferrer" : undefined
							}
							className="flex items-center justify-between rounded-lg border border-zinc-800/80 bg-zinc-950/70 p-4 transition-all hover:border-zinc-700 hover:bg-zinc-900/40 group"
						>
							<div className="flex items-center space-x-3">
								<div className="flex h-8 w-8 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-zinc-400 group-hover:border-zinc-600 group-hover:text-white transition-colors">
									<Icon className="h-4 w-4" />
								</div>
								<div>
									<div className="text-[10px] text-zinc-500 font-semibold tracking-wider">
										{link.label}
									</div>
									<div className="text-sm font-bold text-white group-hover:text-zinc-200 transition-colors">
										{link.value}
									</div>
								</div>
							</div>
							<span className="text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">
								CONNECT ↗
							</span>
						</a>
					);
				})}
			</div>

			<div className="rounded-lg border border-zinc-900 bg-zinc-950/40 p-4 text-xs space-y-2 text-zinc-500">
				<div className="flex items-center space-x-2">
					<MapPin className="h-3.5 w-3.5 text-zinc-600" />
					<span>LOCATION: São Paulo, Brazil [UTC-3]</span>
				</div>
				<div className="flex items-center space-x-2">
					<Globe className="h-3.5 w-3.5 text-zinc-600" />
					<span>WORK_MODE: Remote / Hybrid Server-Side Infrastructure</span>
				</div>
			</div>
		</div>
	);
}
