import { ContactChannels } from "./ContactChannels";
import { ContactHeader } from "./ContactHeader";
import { ContactTerminal } from "./ContactTerminal";

export function ContactSection() {
	return (
		<section
			id="contact"
			className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20"
		>
			<div className="space-y-12 border-l-2 border-zinc-800 pl-6">
				<ContactHeader />

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
					<div className="lg:col-span-5">
						<ContactChannels />
					</div>
					<div className="mt-8 lg:mt-0 lg:col-span-7">
						<ContactTerminal />
					</div>
				</div>
			</div>
		</section>
	);
}
