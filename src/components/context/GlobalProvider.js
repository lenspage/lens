"use client";

import { createContext, useContext, useState } from "react";

const Context = createContext();

export const useGlobalContext = () => useContext(Context);

export default function GlobalProvider({ children }) {
	const [currentTheme, setCurrentTheme] = useState("dark");
	const [animationLoaded, setAnimationLoaded] = useState(false);
	const [codeBlockLoaded, setCodeBlockLoaded] = useState(true);

	return (
		<Context.Provider
			value={{
				currentTheme,
				setCurrentTheme,
				animationLoaded,
				setAnimationLoaded,
				codeBlockLoaded,
				setCodeBlockLoaded
			}}
		>
			{children}
		</Context.Provider>
	);
}
