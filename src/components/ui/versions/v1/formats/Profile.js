import DOMPurify from "isomorphic-dompurify";
import { render } from "@/components/ui/versions/v1/blocks/rendering/render.js";

export default function Profile({ data, username, gateway }) {
	let sanitizedMarkup;
	if (data.components.header.bio) {
		sanitizedMarkup = DOMPurify.sanitize(data.components.header.bio);
	}

	return (
		<div className="flex select-none flex-col min-h-screen items-center justify-center max-w-[530px] m-auto">
			<div className="flex flex-col items-center pt-[70px] pb-[50px] w-full">
				<div className="avatar">
					<div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
						<img
							src={data.components.header.image.src}
							alt={data.components.header.image.alt}
						/>
					</div>
				</div>
				<div className="h-[10px]" />
				<div className="text-center cursor-default">
					<div className="text-base px-4">@{username}</div>
					{data.components.header.bio && (
						<div
							id="data-block"
							className="w-full mt-[30px] text-base px-4"
							dangerouslySetInnerHTML={{ __html: sanitizedMarkup }}
						/>
					)}
				</div>
				<div className="w-full m-auto">
					<div className={`flex flex-col mt-[40px] max-w-[600px] w-full`}>
						{data.components.blocks.map((item, index) => (
							<div key={index}>{render(item, gateway)}</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
