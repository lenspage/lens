import api from "@/components/data/api.js";

export async function GET(request, { params }) {
	return api({ params });
}
