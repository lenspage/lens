import backpack from "@/assets/icons/backpack-icon.png";
import phantom from "@/assets/icons/phantom-icon.png";
import solflare from "@/assets/icons/solflare-icon.png";

export const walletList = [
	{
		name: "Backpack",
		icon: backpack.src,
		provider: "backpack"
	},
	{
		name: "Phantom",
		icon: phantom.src,
		provider: "phantom.solana"
	},
	{
		name: "Solflare",
		icon: solflare.src,
		provider: "solflare"
	}
];
