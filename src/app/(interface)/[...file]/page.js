import pageMetadataHandler from "@/components/data/pageMetadataHandler.js";
import pageContentHandler from "@/components/data/pageContentHandler.js";

export async function generateMetadata({ params }) {
	return pageMetadataHandler({ params });
}

export default async function Page({ params }) {
	return pageContentHandler({ params });
}
