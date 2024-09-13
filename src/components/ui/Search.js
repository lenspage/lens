"use client";

import { useGlobalContext } from "@/components/context/GlobalProvider.js";
import Navigation from "@/components/ui/navigation/SearchNavigation.js";
import SearchInput from "@/components/ui/inputs/SearchInput.js";
import Theme from "@/components/ui/menus/Theme.js";
import Particles from "@/components/ui/particles/Particles.js";

export default function Search() {
	const { animationLoaded } = useGlobalContext();

	return (
		<div className="min-h-screen">
			<Navigation />
			<main>
				{animationLoaded ? (
					<SearchInput />
				) : (
					<div className="fixed inset-0 flex items-center justify-center">
						<span className="loading loading-ring loading-lg" />
					</div>
				)}
			</main>
			<div className="fixed select-none bottom-3 max-[600px]:bottom-4 flex items-start justify-center w-full">
				<Theme />
			</div>
			<div
				className={`mix-blend-exclusion ${animationLoaded ? "opacity-100" : "opacity-0"}`}
			>
				<Particles preset="network" />
			</div>
		</div>
	);
}
