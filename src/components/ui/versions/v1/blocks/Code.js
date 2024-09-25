"use client";

import { useState, useEffect } from "react";
import { useGlobalContext } from "@/components/context/GlobalProvider.js";
import DOMPurify from "isomorphic-dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import "@/styles/code.scss";

export default function Code({ item }) {
	const { setCodeBlockLoaded } = useGlobalContext();
	const [code, setCode] = useState(null);

	async function fetchCode() {
		const response = await fetch(item.value, { cache: "no-store" });
		const data = await response.text();
		let highlight;
		if (item.attributes?.language) {
			highlight = hljs.highlight(data, {
				language: item.attributes.language
			}).value;
		} else {
			highlight = hljs.highlightAuto(data).value;
		}
		const sanitized = DOMPurify.sanitize(highlight);
		setCode(sanitized);
		setCodeBlockLoaded(true);
	}

	useEffect(() => {
		setCodeBlockLoaded(false);
		fetchCode();
	}, [item]);

	return (
		<div className="mx-4">
			<pre
				className={`w-full overflow-scroll text-sm ${item.attributes?.break ? "mb-[40px]" : "mb-[20px]"}`}
			>
				<code dangerouslySetInnerHTML={{ __html: code }} />
			</pre>
		</div>
	);
}
