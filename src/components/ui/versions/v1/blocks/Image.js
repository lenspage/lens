export default function Image({ gateway, item }) {
	return (
		<>
			<img
				className={`px-4 max-[600px]:px-0 ${item.attributes?.blend && item.attributes?.blend ? "mix-blend-exclusion" : ""}`}
				src={
					item.value.startsWith("ipfs://")
						? `${gateway}/ipfs/${item.value.replace("ipfs://", "")}`
						: item.value
				}
				alt={item.attributes?.alt}
			/>
			<p
				className={`uppercase px-4 text-xs mt-[10px] ${item.attributes?.break ? "mb-[40px]" : "mb-[20px]"}`}
			>
				{item.attributes?.caption}
			</p>
		</>
	);
}
