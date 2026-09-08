import Link from "next/link";

interface NavBrandProps {
	onNavigate?: () => void;
}

export function NavBrand({ onNavigate }: NavBrandProps) {
	return (
		<Link
			href="/"
			onClick={onNavigate}
			className="group flex items-center space-x-2 text-white transition-colors hover:text-zinc-400"
		>
			<span className="text-zinc-500 font-bold">[</span>
			<span className="tracking-wider font-semibold">VÍTOR_PIRES</span>
			<span className="text-zinc-500 font-bold">]</span>
		</Link>
	);
}
