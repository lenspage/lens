import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

export default function Paragraph({ item }) {
	const rawMarkup = marked(item.value);

	const sanitizedMarkup = DOMPurify.sanitize(rawMarkup, {
		ADD_ATTR: ["target"],
		ALLOWED_TARGETS: ["_self", "_blank"]
	});

	return (
		<div
			id="data-block"
			className={`w-full mt-[0px] text-base px-4 ${item.attributes?.break ? "mb-[40px]" : "mb-[20px]"}`}
			dangerouslySetInnerHTML={{ __html: sanitizedMarkup }}
		/>
	);
}
