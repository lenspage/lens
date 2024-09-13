"use client";

import { useState, useEffect } from "react";
import { useGlobalContext } from "@/components/context/GlobalProvider.js";
import Navigation from "@/components/ui/navigation/LensPageNavigation.js";
import Particles from "@/components/ui/particles/Particles.js";
import Profile from "@/components/ui/versions/v1/formats/Profile.js";
import Article from "@/components/ui/versions/v1/formats/Article.js";

export default function LensPage({ data, params }) {
	const { setCurrentTheme, animationLoaded, codeBlockLoaded } =
		useGlobalContext();
	const [appHasLoaded, setAppHasLoaded] = useState();

	const format = data[0].format;
	const username = params.file[0];
	const gateway = "https://dweb.link";

	const label = format === "profile" && "PROFILE";

	useEffect(() => {
		if (animationLoaded && codeBlockLoaded) {
			setCurrentTheme(data[0].design?.theme || "dark");
			setAppHasLoaded(true);
		}
	}, [animationLoaded, codeBlockLoaded]);

	return (
		<>
			<Navigation data={data} label={label} params={params} />
			<main>
				<div className={appHasLoaded ? "" : "hidden"}>
					{format === "profile" && (
						<Profile data={data[0]} username={username} gateway={gateway} />
					)}
					{format === "article" && (
						<Article
							data={data[0]}
							image={data[1]}
							username={username}
							gateway={gateway}
						/>
					)}
				</div>
				{!appHasLoaded && (
					<div
						data-theme="dark"
						className="fixed inset-0 flex items-center justify-center"
					>
						<span className="loading loading-ring loading-lg" />
					</div>
				)}
			</main>
			<div
				className={`mix-blend-exclusion ${appHasLoaded ? "opacity-100" : "opacity-0"}`}
			>
				<Particles preset={data[0].design?.animation} />
			</div>
			<script
				type="module"
				src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"
			/>
		</>
	);
}
