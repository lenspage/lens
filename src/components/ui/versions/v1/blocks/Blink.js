"use client";

import { useState, useEffect } from "react";
import { useGlobalContext } from "@/components/context/GlobalProvider.js";
import { walletList } from "@/components/utils/walletList.js";
import { Connection, VersionedTransaction } from "@solana/web3.js";
import { ActionConfig, useAction } from "@dialectlabs/blinks-core";
import { Blink } from "@dialectlabs/blinks";
import Image from "next/image";
import web3 from "@/assets/icons/web3-icon.png";
import phantom from "@/assets/icons/phantom-icon.png";
import "@dialectlabs/blinks/index.css";
import "@/styles/blinks.scss";

export default function BlinkComponent({ item }) {
	const {
		setBlinkBlockLoaded,
		selectedWallet,
		setSelectedWallet,
		isSelectWalletModalOpen,
		setIsSelectWalletModalOpen
	} = useGlobalContext();
	const [learn, setLearn] = useState(false);
	const [providerDetected, setProviderDetected] = useState(false);
	const [wallets, setWallets] = useState([]);
	const walletsMaxIndex = wallets.length !== 0 ? wallets.length - 1 : 0;

	useEffect(() => {
		setBlinkBlockLoaded(false);
	}, [item]);

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
				if (selectedWallet?.publicKey) {
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
				if (selectedWallet?.publicKey) {
					const provider = selectedWallet.provider;
					const transactionMessage = VersionedTransaction.deserialize(
						Buffer.from(message, "base64")
					);
					const signedTransaction =
						await provider.signTransaction(transactionMessage);
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
		if (wallets && action) {
			setBlinkBlockLoaded(true);
		}
	}, [wallets, action]);

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

	const selectWallet = async (selectedWallet) => {
		await selectedWallet.provider.connect();
		if (selectedWallet.provider.isConnected) {
			setSelectedWallet({
				name: selectedWallet.name,
				provider: selectedWallet.provider,
				publicKey: selectedWallet.provider.publicKey.toString()
			});
			setIsSelectWalletModalOpen(false);
		}
	};

	return (
		action &&
		wallets && (
			<>
				{item.attributes?.image && (
					<div className="px-4 mb-5">
						<img
							className="rounded-lg"
							src={
								item.attributes?.image?.src.startsWith("ipfs://")
									? `${gateway}/ipfs/${item.attributes?.image?.src.replace("ipfs://", "")}`
									: item.attributes?.image?.src
							}
							alt={item.attributes?.image?.alt}
						/>
					</div>
				)}
				<div
					className={`w-full px-4 ${item.attributes?.break ? "mb-[40px]" : "mb-[20px]"}`}
				>
					<div
						className={`hide-padding hide-top-padding hide-rounded hide-image-svg-a ${!selectedWallet?.publicKey && "hide-button-input hide-peer hide-gap"}`}
					>
						<Blink action={action} websiteText={new URL(item.value).hostname} />
					</div>
					{!selectedWallet?.publicKey && (
						<div
							className="px-4 flex items-center justify-center text-center font-semibold bg-base-300 hover:bg-base-200 text-base-content w-full text-base h-[43.2px] rounded-lg cursor-pointer"
							onClick={() => setIsSelectWalletModalOpen(true)}
						>
							Connect Wallet
						</div>
					)}
				</div>
				<dialog id="wallets" className="modal modal-bottom sm:modal-middle">
					<div className="modal-box p-4">
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
									className="btn btn-base-100 btn-lg px-3 rounded-lg transition-color duration-300 w-full text-base"
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
											{data.name === selectedWallet
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
									<button className="btn btn-base-100 btn-lg px-3 rounded-lg transition-color duration-300 w-full text-base">
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
										className="btn btn-base-100 btn-lg px-3 rounded-lg transition-color duration-300 w-full text-base"
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
