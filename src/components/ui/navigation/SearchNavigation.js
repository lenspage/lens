import Logo from "@/components/ui/graphics/Logo.js";
import Status from "@/components/ui/labels/Status.js";
import Flashing from "@/components/ui/actions/Flashing.js";

export default function SearchNavigation() {
	return (
		<>
			<div className="select-none fixed top-3 left-3 flex items-start justify-between z-10">
				<Logo />
				<div className="w-3" />
				<Status label={"WELCOME"} />
			</div>
			<div className="fixed top-3 right-3 flex items-start justify-between z-10 select-none">
				<a href="https://docs.lens.page">
					<div className="text-xs font-[200] tracking-wider">
						<Flashing>DOCS</Flashing>
					</div>
				</a>
				<div className="w-2" />
				<a href="https://editor.lens.page">
					<div className="text-xs font-[200] tracking-wider flex">
						<Flashing>EDITOR</Flashing>
					</div>
				</a>
			</div>
		</>
	);
}
