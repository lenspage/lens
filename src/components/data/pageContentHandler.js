import { redirect } from "next/navigation";
import LensPage from "@/components/ui/versions/v1/LensPage.js";
import NotFound from "@/components/ui/NotFound.js";
import Error from "@/components/ui/Error.js";
import fetchPageData from "@/components/utils/fetchPageData.js";

export default async function pageContentHandler({ params }) {
	if (params.file[0].includes("%40")) {
		const url = params.file[0].replace("%40", "");
		if (params.file.length === 1) {
			redirect(`/${url}`);
		} else if (params.file.length === 2) {
			redirect(`/${url}/${params.file[1]}`);
		}
	}

	let data;
	if (params.file.length === 1) {
		data = await fetchPageData({ base: params.file[0] });
	} else if (params.file.length === 2) {
		data = await fetchPageData({ base: params.file[0], layer: params.file[1] });
	}

	if (!data) {
		return <NotFound data={"THIS IS NOT A PAGE"} />;
	}

	if (data[0].errors) {
		return <Error data={data} />;
	}

	const versions = [1];
	if (!versions.includes(data[0].version)) {
		return (
			<Error data={[{ errors: ["not recognized or out of date version"] }]} />
		);
	}

	return <LensPage data={data} params={params} />;
}
