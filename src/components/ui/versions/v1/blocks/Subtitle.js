export default function Subtitle({ item }) {
	return (
		<h2
			className={`mt-[0px] px-4 text-2xl leading-[1] ${item.attributes?.break ? "mb-[40px] max-[1200px]:mt-[40px]" : "mb-[20px]"}`}
		>
			<b>{item.value}</b>
		</h2>
	);
}
