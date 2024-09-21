"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { walletList } from "@/components/utils/walletList.js";
import { Connection, VersionedTransaction } from "@solana/web3.js";
import { ActionConfig, useAction } from "@dialectlabs/blinks-core";
import { Blink } from "@dialectlabs/blinks";
import web3 from "@/assets/icons/web3-icon.png";
import phantom from "@/assets/icons/phantom-icon.png";
import "@dialectlabs/blinks/index.css";
import "@/styles/blinks.scss";

export default function BlinkComponent({ item }) {
	const [isSelectWalletModalOpen, setIsSelectWalletModalOpen] = useState(false);
	const [learn, setLearn] = useState(false);
    const [providerDetected, setProviderDetected] = useState(false);
	const [selectedWallet, setSelectedWallet] = useState(null);
	const [wallets, setWallets] = useState([]);
	const walletsMaxIndex = wallets.length !== 0 ? wallets.length - 1 : 0;

	const selectWallet = (selectedWallet) => {
		localStorage.setItem("wallet", selectedWallet.name);
		setSelectedWallet(selectedWallet);
		setIsSelectWalletModalOpen(false);
	};

	const connection = new Connection(
		process.env.NEXT_PUBLIC_SOLANA_RPC_API,
		"confirmed"
	);

	async function getWallets() {
		const walletListArray = [];
		const indexWallets = (active) =>
			walletList.forEach(({ name, icon, provider }) => {
				const walletProvider = provider
					.split(".")
					.reduce((acc, prop) => acc?.[prop], window);
				if (walletProvider && active) {
					walletListArray.push({
						name,
						icon,
						provider: walletProvider,
						detected: true
					});
					if (name === localStorage.getItem("wallet")) {
						if (walletProvider.isConnected) {
							setSelectedWallet({
								name,
								icon,
								provider: walletProvider,
								publicKey: walletProvider.publicKey.toString()
							});
						}
					}
				}
				if (!walletProvider && !active) {
					walletListArray.push({
						name,
						icon,
						provider: null,
						detected: false
					});
				}
			});
		indexWallets(true);
        if (walletListArray.length > 0) {
            setProviderDetected(true);
        }
		indexWallets(false);
		setWallets(walletListArray);
	}

	useEffect(() => {
		getWallets();
	}, []);

	const adapter = new ActionConfig(connection, {
		connect: async () => {
			try {
				if (selectedWallet) {
					return selectedWallet.publicKey;
				} else {
					setIsSelectWalletModalOpen(true);
				}
			} catch (e) {
				console.error("Connect error:", e);
			}
		},
		signTransaction: async (message) => {
			try {
				if (selectedWallet) {
					const transactionMessage = VersionedTransaction.deserialize(
						Buffer.from(message, "base64")
					);
					const signedTransaction =
						await selectedWallet.provider.signTransaction(transactionMessage);
					const transactionSignature =
						await connection.sendTransaction(signedTransaction);
					return { signature: transactionSignature };
				}
			} catch (e) {
				console.error("Transaction error:", e);
			}
		}
	});

	const { action } = useAction({ url: item.value, adapter });

	useEffect(() => {
		setLearn(false);
		if (wallets && action) {
			const selectWalletModal = document.getElementById("wallets");
			if (isSelectWalletModalOpen) {
				selectWalletModal.showModal();
			} else {
				selectWalletModal.close();
			}
		}
	}, [isSelectWalletModalOpen, wallets, action]);

	return (
		action &&
		wallets && (
			<>
				<div className="w-full max-[1200px]:px-4 hide-image">
					<Blink action={action} websiteText={new URL(item.value).hostname} />
				</div>
				<dialog id="wallets" className="modal modal-bottom sm:modal-middle">
					<div className="modal-box p-4 outline outline-1 outline-base-100 bg-base-300">
						<form method="dialog">
							<button
								className="btn btn-sm btn-circle btn-ghost focus:outline-none focus:ring-0 absolute right-2 top-2"
								onClick={() => setIsSelectWalletModalOpen(false)}
							>
								✕
							</button>
						</form>
						{!learn ? (
							<div className="flex flex-col items-start">
								<h3 className="font-bold text-md">Select a wallet</h3>
								<div className="h-6" />
								<button
									className="btn btn-base-100 btn-lg px-3 transition-color duration-300 w-full text-base"
									onClick={() => setLearn(true)}
								>
									<div className="flex items-center justify-between w-full">
										<div className="flex items-center justify-center">
											<Image
												src={web3}
												alt="icon"
												width={40}
												height={40}
												className="rounded-lg"
											/>
											<div className="w-3" />
											What's a web3 wallet?
										</div>
										<div className="text-xs font-light">Learn</div>
									</div>
								</button>
								<div className="h-6" />
								<div className="w-full h-[1px] bg-base-100 px-0" />
								<div className="h-6" />
								{wallets.map((data, index) => (
									<button
										key={index}
										className={`btn btn-base-100 btn-lg transition-color duration-300 w-full mb-1 px-3 flex justify-between items-center ${walletsMaxIndex === 0 ? "rounded-t-lg rounded-b-lg" : index === 0 ? "rounded-t-lg rounded-l-none rounded-r-none rounded-b-none" : index === walletsMaxIndex ? "rounded-t-none rounded-b-lg" : "rounded-l-none rounded-r-none"}`}
										disabled={data.detected ? false : true}
										onClick={() => selectWallet(data)}
									>
										<div className="flex items-center text-base">
											<Image
												src={data.icon}
												alt="icon"
												width={40}
												height={40}
												className="rounded-lg"
											/>
											<div className="w-3" />
											{data.name}
										</div>
										<div className="text-xs font-light">
											{data.name === selectedWallet?.name
												? "Currently Selected"
												: data.detected
													? "Detected"
													: "Not Installed"}
										</div>
									</button>
								))}
								<div className="h-2" />
							</div>
						) : (
							<div className="flex flex-col items-start">
								<h3 className="font-bold text-md">What's a web3 wallet?</h3>
								<div className="h-6" />
								<div className="flex flex-col items-center justify-center w-full">
									<p className="text-left text-sm">
										A Web3 wallet is a localized digital software that allows
										users to interact with decentralized applications, called
										dApps, and blockchain networks, such as Solana, directly
										from their web browser or mobile device.
									</p>
									<div className="h-6" />
									<p className="text-left text-sm">
										Web3 wallets operate like cash in your pocket, only the
										assets are digital. No third party can tamper with these
										assets. Unlike traditional digital assets, which are usually
										hosted by a third party, the digital assets in your wallet
										are controlled solely by you.
									</p>
									<div className="h-6" />
									<p className="text-left text-sm">
										A web3 wallet provides users with a secure way to store
										private keys, sign transactions, and connect to various
										decentralized platforms, making them essential for engaging
										with the decentralized web (web3). Popular examples include
										Phantom, Solflare, and Brave.
									</p>
								</div>
								<div className="h-7" />
								{!providerDetected ? (
									<button className="btn btn-base-100 btn-lg px-3 transition-color duration-300 w-full text-base">
										<a
											href="https://phantom.app"
											target="_blank"
											rel="noopener noreferrer"
											className="w-full text-left text-base flex items-center"
										>
											<div className="flex items-center justify-between w-full">
												<div className="flex items-center justify-center">
													<Image
														src={phantom.src}
														alt="icon"
														width={40}
														height={40}
														className="rounded-lg"
													/>
													<div className="w-3" />
													Download Phantom
												</div>
												<div className="text-xs font-light">Get Started</div>
											</div>
										</a>
									</button>
								) : (
									<button
										className="btn btn-base-100 btn-lg px-3 transition-color duration-300 w-full text-base"
										onClick={() => setLearn(false)}
									>
										<div className="flex items-center justify-between w-full">
											<div className="flex items-center justify-center">
												Select a wallet
											</div>
											<div className="text-xs font-light">Get Started</div>
										</div>
									</button>
								)}
								<div className="h-2" />
							</div>
						)}
					</div>
					<form method="dialog" className="modal-backdrop">
						<button
							onClick={() => setIsSelectWalletModalOpen(false)}
							className="cursor-default"
						>
							close
						</button>
					</form>
				</dialog>
			</>
		)
	);
}
