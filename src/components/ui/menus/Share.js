"use client";

import { useState, useEffect } from "react";
import Flashing from "@/components/ui/actions/Flashing.js";
import QRCode from "qrcode.react";

export default function Share({ params }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [copied, setCopied] = useState(false);
	const [copyKeyNumber, setCopyKeyNumber] = useState(1);
	const [copiedKeyNumber, setCopiedKeyNumber] = useState(1);

	const copyUrl =
		params.file.length === 1
			? `lens.page/${params.file[0]}`
			: `lens.page/${params.file[0]}/${params.file[1]}`;

	useEffect(() => {
		let timeout;
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			setCopied(false);
		}, 3000);
		return () => clearTimeout(timeout);
	}, [copiedKeyNumber]);

	function copyLink() {
		navigator.clipboard.writeText(`https://${copyUrl}`);
		setCopied(true);
		setCopiedKeyNumber(copiedKeyNumber + 1);
	}

	const toggleModal = () => {
		const modal = document.getElementById("share_modal");
		if (!isModalOpen) {
			modal.showModal();
			setCopyKeyNumber(copyKeyNumber + 1);
		} else {
			setCopied(false);
		}
		setIsModalOpen(!isModalOpen);
	};

	return (
		<>
			<button
				className={`text-xs font-[200] tracking-wider flex`}
				onClick={toggleModal}
			>
				{!isModalOpen ? (
					<Flashing key="open">SHARE</Flashing>
				) : (
					<Flashing key="close">CLOSE</Flashing>
				)}
			</button>
			<dialog id="share_modal" className="modal modal-bottom sm:modal-middle">
				<div
					onClick={copyLink}
					className="modal-box rounded-t-2xl sm:rounded-2xl flex items-center justify-start flex-col p-4 cursor-pointer"
				>
					<div className="px-0 w-full">
						<div className="p-0 w-full text-center rounded-2xl overflow-hidden whitespace-nowrap">
							<QRCode
								value={`https://${copyUrl}`}
								renderAs="svg"
								width="100%"
								height="100%"
								className="mix-blend-exclusion invert"
							/>
						</div>
						<div className="h-5" />
						<div className="flex justify-center w-full">
							<div className="text-xs font-[200] tracking-wider mix-blend-exclusion text-center h-5">
								{!copied ? (
									<Flashing key={`copy-${copyKeyNumber}`}>COPY</Flashing>
								) : (
									<Flashing key={`copied-${copiedKeyNumber}`}>COPIED</Flashing>
								)}
							</div>
						</div>
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
