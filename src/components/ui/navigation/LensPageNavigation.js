import Link from "next/link";
import Logo from "@/components/ui/graphics/Logo.js";
import Status from "@/components/ui/labels/Status.js";
import Theme from "@/components/ui/menus/Theme.js";
import Share from "@/components/ui/menus/Share.js";

export default function LensPageNavigation({ data, label, params }) {
	const isProfile = data[0].format === "profile" ? true : false;

	return (
		<>
			<div className="select-none mix-blend-exclusion fixed top-3 left-3 flex items-start justify-between z-10">
				<Link href={isProfile ? "/" : "#top"}>
					<Logo code={false} />
				</Link>
				<div className="w-3" />
				<Status label={label} />
			</div>
			<div className="mix-blend-exclusion fixed top-3 right-3 flex items-start justify-between z-10 select-none">
				<div className="mix-blend-exclusion text-white">
					<Share params={params} />
				</div>
				<div className="w-2" />
				<div className="mix-blend-exclusion text-white w-[80px] flex justify-center">
					<Theme />
				</div>
			</div>
		</>
	);
}
