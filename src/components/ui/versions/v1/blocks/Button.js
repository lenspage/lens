export default function Button({ item }) {
	return (
		<div
			className={`flex items-center justify-center
				${item.attributes?.break ? "mb-[40px]" : "mb-[20px]"}
			`}
		>
			<a
				href={item.attributes?.url}
				target={
					item.attributes?.target === "_self" ||
					item.attributes?.target === "self"
						? "_self"
						: "_blank"
				}
				className={`cursor-pointer px-4 ${item.attributes?.style !== "link" ? "w-full" : ""}`}
			>
				<button
					className={`w-full ${!item.attributes?.style || item.attributes?.style === "default" ? "btn" : ""} ${item.attributes?.style === "primary" ? "btn btn-primary" : ""} ${item.attributes?.style === "secondary" ? "btn btn-secondary" : ""} ${item.attributes?.style === "link" ? "btn btn-link" : ""}`}
				>
					{item.value}
				</button>
			</a>
		</div>
	);
}
