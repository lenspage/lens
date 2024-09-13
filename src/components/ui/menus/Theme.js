"use client";

import { useState } from "react";
import { useGlobalContext } from "@/components/context/GlobalProvider.js";
import Flashing from "@/components/ui/actions/Flashing.js";

export default function Theme() {
	const { currentTheme, setCurrentTheme } = useGlobalContext();
	const [isModalOpen, setIsModalOpen] = useState(false);

	function handleThemeChange(e) {
		setCurrentTheme(e.target.value);
	}

	const toggleModal = () => {
		const modal = document.getElementById("themes_modal");
		if (!isModalOpen) {
			modal.showModal();
		}
		setIsModalOpen(!isModalOpen);
	};

	return (
		<>
			<button
				className="text-xs font-[200] tracking-wider flex"
				onClick={toggleModal}
			>
				{!isModalOpen ? (
					<Flashing key="open">THEME</Flashing>
				) : (
					<Flashing key="close">CLOSE</Flashing>
				)}
			</button>
			<dialog id="themes_modal" className="modal modal-bottom sm:modal-middle">
				<div className="modal-box flex items-center justify-start flex-col p-0 rounded-t-2xl sm:rounded-2xl">
					<div className="join join-vertical w-full rounded-t-2xl sm:rounded-2xl">
						{[
							"dark",
							"light",
							"black",
							"synthwave",
							"acid",
							"retro",
							"cmyk",
							"dracula",
							"lofi",
							"cyberpunk",
							"valentine",
							"halloween",
							"pastel",
							"aqua"
						].map((t) => (
							<input
								key={t}
								type="radio"
								name="theme-buttons"
								className="btn rounded-none theme-controller border-none focus:outline-none"
								aria-label={t.charAt(0).toUpperCase() + t.slice(1)}
								value={t}
								checked={currentTheme === t}
								onChange={(e) => handleThemeChange(e)}
							/>
						))}
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button onClick={toggleModal} className="cursor-default">
						close
					</button>
				</form>
			</dialog>
		</>
	);
}
