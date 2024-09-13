import { bebas_neue } from "@/styles/fonts.js";
import { render } from "@/components/ui/versions/v1/blocks/rendering/render.js";

export default function Article({ data, image, username, gateway }) {
	return (
		<div className="grid grid-cols-2 max-[1200px]:grid-cols-1 min-h-screen justify-start max-[1200px]:items-center max-[1200px]:justify-center max-w-[1200px] m-auto">
			<div>
				<div className="fixed max-[1200px]:relative w-[600px] max-[600px]:w-full h-full m-auto pl-[13px] pr-[30px] max-[1200px]:pl-[0px] max-[1200px]:pr-[0px] max-[1200px]:pt-[80px]">
					<div
						className={`flex max-[1200px]:px-4 flex-col justify-between pt-[45px] max-[1200px]:pt-[0px] pb-[13px] max-[1200px]:pb-[0px] h-full`}
					>
						<h1
							className={`max-[1200px]:hidden leading-[0.8] uppercase break-words ${bebas_neue.className}`}
							style={{
								fontSize: data.components.header.size.desktop
							}}
						>
							{data.components.header.headline}
						</h1>
						<h1
							className={`max-[1200px]:flex hidden leading-[0.8] uppercase break-words ${bebas_neue.className}`}
							style={{
								fontSize: data.components.header.size.mobile
							}}
						>
							{data.components.header.headline}
						</h1>
						<div
							className={`flex items-center justify-between max-[1200px]:mt-[20px] text-sm`}
						>
							{image ? (
								<a href={`/${username}`}>
									<div className="flex items-center justify-between">
										<div className="avatar">
											<div
												className={`ml-[5px] mr-[12px] w-4 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2`}
											>
												<img src={image.components.header.image.src} />
											</div>
										</div>
										@{username}
									</div>
								</a>
							) : (
								<div className="flex items-center justify-between">
									<p className="font-semibold">{username}</p>
								</div>
							)}
							<div className="w-[10px]" />
							<p className="text-right">
								{new Date(data.components.timestamp).toLocaleString("en-US", {
									timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
									hour12: true,
									weekday: "long",
									year: "numeric",
									month: "short",
									day: "numeric"
								})}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="flex items-end max-[1200px]:items-center justify-start flex-col w-full m-auto pb-[40px]">
				<div
					className={`flex flex-col max-[600px]:mb-5 ${data.components.blocks[0].type.includes("subtitle") ? "pt-[42px] max-[1200px]:pt-[0px] max-[1200px]:mt-[20px]" : "pt-[40px] max-[1200px]:pt-[0px] max-[1200px]:mt-[20px]"} pb-[0px] max-w-[600px] w-full`}
				>
					{data.components.blocks.map((item, index) => (
						<div key={index}>{render(item, gateway)}</div>
					))}
				</div>
			</div>
		</div>
	);
}
