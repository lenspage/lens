import scrollPercent from "@/components/ui/actions/scrollPercent.js";

export default function Status({ label }) {
	return (
		<div
			className={`transition-all ${label === "WELCOME" || label === "ERROR" ? "" : "mix-blend-exclusion text-white"} duration-300 tracking-wide text-xs font-[200] select-none`}
		>
			{!label ? <>(SCROLL&nbsp;{scrollPercent()}%)</> : <>({label})</>}
		</div>
	);
}
