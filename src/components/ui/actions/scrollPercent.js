"use client";

import { useState, useEffect } from "react";

export default function ScrollTracker() {
	const [scrollPercentage, setScrollPercentage] = useState(0);

	useEffect(() => {
		const calculateScrollPercentage = () => {
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight;
			const scrolled = parseInt((scrollTop / docHeight) * 100);
			if (scrolled > 100) {
				setScrollPercentage(100);
			} else if (scrolled < 0) {
				setScrollPercentage(0);
			} else if (scrolled) {
				setScrollPercentage(scrolled);
			} else {
				setScrollPercentage(0);
			}
		};

		window.addEventListener("scroll", calculateScrollPercentage);
		return () => {
			window.removeEventListener("scroll", calculateScrollPercentage);
		};
	}, []);

	return scrollPercentage;
}
