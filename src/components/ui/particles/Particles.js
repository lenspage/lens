"use client";

import { useState, useEffect, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useGlobalContext } from "@/components/context/GlobalProvider.js";
import { network, stars } from "@/components/ui/particles/presets.js";

export default memo(function TsParticles({ preset }) {
	const { setAnimationLoaded } = useGlobalContext();
	const [option, setOption] = useState(null);

	useEffect(() => {
		if (preset === "network") {
			setOption(network());
		} else if (preset === "stars") {
			setOption(stars());
		}
	}, [preset]);

	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadSlim(engine);
			setAnimationLoaded(true);
		});
	}, []);

	const particlesLoaded = () => {};

	return (
		option && (
			<div id="particles">
				<Particles
					id="tsparticles"
					particlesLoaded={particlesLoaded}
					options={option}
				/>
			</div>
		)
	);
});
