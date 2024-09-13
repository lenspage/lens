export default function Model({ gateway, item }) {
	return (
		<div
			className={`mx-[40px] ${item.attributes?.break ? "mb-[40px]" : "mb-[20px]"}`}
		>
			<model-viewer
				src={
					item.value.startsWith("ipfs://")
						? `${gateway}/ipfs/${item.value.replace("ipfs://", "")}`
						: item.value
				}
				alt={item.attributes?.alt}
				ar
				shadow-intensity="1"
				camera-controls
				touch-action="pan-y"
			/>
		</div>
	);
}
