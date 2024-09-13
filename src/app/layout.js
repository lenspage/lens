import GlobalProvider from "@/components/context/GlobalProvider.js";
import defaultMetadata from "@/components/data/metadata.json";
import icon from "@/assets/icon.png";
import "@/styles/globals.scss";

const title = defaultMetadata.title;
const description = defaultMetadata.description;

export const metadata = {
	title: title,
	description: description,
	icons: {
		icon: icon.src
	}
};

export const viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	minimumScale: 1
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="overscroll-none">
			<body id="top">
				<GlobalProvider>{children}</GlobalProvider>
			</body>
		</html>
	);
}
