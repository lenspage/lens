export default function Embed({ item }) {
	const height =
		item.attributes?.height &&
		`height: ${item.attributes?.height}px !important; aspect-ratio: auto !important;`;

	return (
		<>
			<div
				className={`z-[999] px-4 select-none ${!item.attributes?.bleed && "max-[600px]:px-0"}`}
			>
				<iframe
					allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
					className={`w-full overflow-hidden ${item.attributes?.bleed && "rounded-lg"} ${!item.attributes?.caption && (item.attributes?.break ? "mb-[40px]" : "mb-[20px]")}`}
					style={
						item.attributes?.ratio
							? { aspectRatio: item.attributes?.ratio }
							: { height: `${item.attributes?.height}px` }
					}
					src={item.value}
				/>
				<style jsx>{`
					@media (max-width: 600px) {
						iframe {
							${height}
						}
					}
				`}</style>
			</div>
			{item.attributes?.caption && (
				<p
					className={`uppercase mt-[10px] px-4 text-xs ${item.attributes?.break ? "mb-[40px]" : "mb-[20px]"}`}
				>
					{item.attributes?.caption}
				</p>
			)}
		</>
	);
}
