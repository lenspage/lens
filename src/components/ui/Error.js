import Logo from "@/components/ui/graphics/Logo.js";
import Status from "@/components/ui/labels/Status.js";
import Flashing from "@/components/ui/actions/Flashing.js";

export default function Error({ data }) {
	return (
		<>
			<div className="select-none fixed top-3 left-3 flex items-start justify-between z-10">
				<Logo code={true} />
				<div className="w-3" />
				<Status label={"ERROR"} />
			</div>
			<main>
				<div className="fixed inset-0 flex flex-col items-center justify-center">
					<ul className="list-none">
						{data[0].errors.map((message, index) => (
							<li
								key={index}
								className="flex items-center text-red-600 mb-[10px]"
							>
								<span className="mr-[15px] font-extrabold">x</span>
								{message}
							</li>
						))}
					</ul>
					<div className="fixed select-none bottom-3 max-[600px]:bottom-4 flex items-start justify-center w-full">
						<a href="/">
							<div className="text-xs font-[200] tracking-wider flex">
								<Flashing>RETURN HOME</Flashing>
							</div>
						</a>
					</div>
				</div>
			</main>
		</>
	);
}
