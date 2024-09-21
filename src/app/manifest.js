import favicon from "@/assets/favicon.png";
import metadata from "@/components/data/metadata.json";

export default function manifest() {
	return {
		name: metadata.title,
		short_name: metadata.title,
		description: metadata.description,
		start_url: "/",
		display: "standalone",
		background_color: "#000000",
		theme_color: "#000000",
		icons: [
			{
				src: favicon.src,
				sizes: "any",
				type: "image/png"
			}
		]
	};
}
