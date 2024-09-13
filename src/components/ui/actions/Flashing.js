"use client";

import { useState, useEffect } from "react";

export default function Flashing({ children }) {
	const [showLeftBracket, setLeftShowBracket] = useState(true);
	const [showRightBracket, setRightShowBracket] = useState(true);

	const flashBrackets = () => {
		let leftFlashes = 8;
		let rightFlashes = 8;

		const leftInterval = setInterval(() => {
			setLeftShowBracket((prev) => !prev);
			leftFlashes--;
			if (leftFlashes === 0) {
				clearInterval(leftInterval);
				setLeftShowBracket(true);
			}
		}, 100);

		const rightInterval = setInterval(() => {
			setRightShowBracket((prev) => !prev);
			rightFlashes--;
			if (rightFlashes === 0) {
				clearInterval(rightInterval);
				setRightShowBracket(true);
			}
		}, 80);
	};

	useEffect(() => {
		flashBrackets();
	}, []);

	return (
		<div onClick={flashBrackets} className="inline-flex">
			<span className="inline-block w-[2ch] text-center">
				{showLeftBracket ? "[" : ""}
			</span>
			<span>&nbsp;{children}&nbsp;</span>
			<span className="inline-block w-[2ch] text-center">
				{showRightBracket ? "]" : ""}
			</span>
		</div>
	);
}
