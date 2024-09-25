export default function Image({ gateway, item }) {
	return (
		<>
			<div className={`px-4 ${!item.attributes?.bleed && "max-[600px]:px-0"}`}>
				<img
					className={`${item.attributes?.bleed ? "rounded-lg" : ""} ${item.attributes?.blend && item.attributes?.blend ? "mix-blend-exclusion" : ""}`}
					src={
						item.value.startsWith("ipfs://")
							? `${gateway}/ipfs/${item.value.replace("ipfs://", "")}`
							: item.value
					}
					alt={item.attributes?.alt}
				/>
			</div>
			<p
				className={`uppercase px-4 text-xs mt-[10px] ${item.attributes?.break ? "mb-[40px]" : "mb-[20px]"}`}
			>
				{item.attributes?.caption}
			</p>
		</>
	);
}
