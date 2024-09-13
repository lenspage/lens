const HOST_NAME = process.env.HOST_NAME;

export default async function fetchPageData({ base, layer }) {
	try {
		const data = [];
		if (base && layer) {
			const layerResponse = await fetch(`${HOST_NAME}/api/${base}/${layer}`, {
				cache: "no-store"
			});
			if (!layerResponse.ok && layerResponse.status !== 400) {
				return false;
			}
			const layerData = await layerResponse.json();
			data.push(layerData);
		}
		try {
			const baseResponse = await fetch(`${HOST_NAME}/api/${base}`, {
				cache: "no-store"
			});
			if (baseResponse.ok || baseResponse.status === 400) {
				const baseData = await baseResponse.json();
				data.push(baseData);
			}
		} catch (e) {
			console.error(
				"User data fetch failed but continuing with page fetch:",
				e
			);
		}
		if (data.length === 0) {
			return false;
		}
		return data;
	} catch (e) {
		console.error("Error fetching user data:", e);
		return false;
	}
}
