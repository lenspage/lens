export default function Video({ gateway, item }) {
	return (
		<>
			<video
				controls
				controlsList="nodownload"
				className={`px-4 max-[600px]:px-0 ${!item.attributes?.caption && (item.attributes?.break ? "mb-[40px]" : "mb-[20px]")}`}
				poster={item.attributes?.thumbnail && item.attributes?.thumbnail}
			>
				<source
					src={
						item.value.startsWith("ipfs://")
							? `${gateway}/ipfs/${item.value.replace("ipfs://", "")}`
							: item.value
					}
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>
			{item.attributes?.caption && (
				<p
					className={`px-4 uppercase text-xs mt-[10px] ${item.attributes?.break ? "mb-[40px]" : "mb-[20px]"}`}
				>
					{item.attributes?.caption}
				</p>
			)}
		</>
	);
}
