import { CONTACT_LINKS } from "../data/contact-links";

export function ContactChannels() {
	return (
		<div className="space-y-6 font-mono">
			<div className="space-y-2">
				<div className="text-xs text-zinc-500 font-semibold tracking-wider">
					[ DIRECT_COMMUNICATION_CHANNELS ]
				</div>
				<p className="text-sm text-zinc-400 leading-relaxed">
					Feel free to reach out directly through any of the secure channels
					below or transmit a message packet using the interactive terminal.
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
		</div>
	);
}
