import fetchPageData from "@/components/utils/fetchPageData.js";
import defaultMetadata from "@/components/data/metadata.json";

export default async function pageMetadataHandler({ params }) {
	let data;
	if (params.file.length === 1) {
		data = await fetchPageData({ base: params.file[0] });
	} else if (params.file.length === 2) {
		data = await fetchPageData({ base: params.file[0], layer: params.file[1] });
	}

	let metadata;
	if (data) {
		if (data[0].metadata?.title && data[0].metadata?.description) {
			metadata = {
				title: data[0].metadata.title,
				description: data[0].metadata.description
			};
		} else {
			metadata = false;
		}
	}

	return {
		title: !metadata ? defaultMetadata.title : metadata.title,
		description: !metadata ? defaultMetadata.description : metadata.description
	};
}
