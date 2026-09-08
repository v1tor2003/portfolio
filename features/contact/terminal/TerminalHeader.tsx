export function TerminalHeader() {
	return (
		<div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950 px-4 py-2 text-xs text-zinc-400 select-none shrink-0">
			<div className="flex items-center space-x-2">
				<div className="flex items-center space-x-1.5">
					<span className="h-2 w-2 rounded-full border border-zinc-700 bg-zinc-800" />
					<span className="h-2 w-2 rounded-full border border-zinc-700 bg-zinc-800" />
					<span className="h-2 w-2 rounded-full border border-zinc-700 bg-zinc-800" />
				</div>
				<span className="ml-2 text-zinc-500 font-mono text-[11px]">
					root@vitor-server:~# [bash]
				</span>
			</div>

			<div className="flex items-center space-x-2 text-[10px] text-zinc-500 font-mono">
				<span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
				<span>TLS_1.3_SECURE</span>
			</div>
		</div>
	);
}

