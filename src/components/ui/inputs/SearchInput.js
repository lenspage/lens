"use client";

import { useState } from "react";

export default function Search() {
	const [inputValue, setInputValue] = useState("");

	function runSearch(e) {
		if (e.key === "Enter" && e.target.value !== "") {
			if (e.target.value.includes("/")) {
				window.location.href = e.target.value.replace("@", "").toLowerCase();
			} else {
				window.location.href = `/${e.target.value.replace("@", "").toLowerCase()}`;
			}
		}
	}

	return (
		<div className="fixed select-none flex flex-col items-center justify-center w-full h-full px-4">
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={(e) => runSearch(e)}
				placeholder="Enter a username or page handle"
				className="input input-bordered w-full max-w-2xl text-center bg-[#00000005]"
			/>
		</div>
	);
}
