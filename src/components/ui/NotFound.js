import Logo from "@/components/ui/graphics/Logo.js";
import Status from "@/components/ui/labels/Status.js";
import Flashing from "@/components/ui/actions/Flashing.js";

export default function NotFound({ data }) {
	return (
		<>
			<div className="select-none fixed top-3 left-3 flex items-start justify-between z-10">
				<Logo code={true} />
				<div className="w-3" />
				<Status label={"ERROR"} />
			</div>
			<main>
				<div className="fixed inset-0 flex flex-col items-center justify-center">
					<div className="font-extrabold">{data}</div>
					<div className="h-5" />
					<a href="/">
						<div className="text-xs font-[200] tracking-wider flex">
							<Flashing>RETURN HOME</Flashing>
						</div>
					</a>
				</div>
			</main>
		</>
	);
}
