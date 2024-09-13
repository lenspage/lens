import { CID } from "multiformats/cid";
import { verify } from "@/components/utils/ajv.js";
import dns from "dns";
import profile from "@/components/ui/versions/v1/schemas/profile.json";
import article from "@/components/ui/versions/v1/schemas/article.json";
import usernames from "@/components/data/usernames.json";

export default async function api({ params }) {
	try {
		let cid;
		let response;
		let data;
		let path;

		try {
			cid = CID.parse(params.file[0]);
		} catch (e) {
			cid = false;
		}

		if (cid) {
			const gateway = "https://dweb.link";

			response = await fetch(`${gateway}/ipfs/${cid}`);

			data = await response.json();
		}

		if (
			params.file[0].includes(".") &&
			!params.file[0].includes(".ico") &&
			!params.file[0].includes(".php") &&
			!params.file[0].includes(".PhP") &&
			!params.file[0].includes(".css")
		) {
			let _lens;

			await new Promise((resolve, reject) => {
				dns.resolveTxt(`_lens.${params.file[0]}`, (err, record) => {
					if (err) {
						console.error(err);
						reject(err);
					} else {
						_lens = record[0][0];
						resolve();
					}
				});
			});

			if (params.file.length === 1) {
				path = _lens.replace("${}", "lens.json");
			} else if (params.file.length === 2) {
				path = _lens.replace("${}", `${params.file[1]}.json`);
			}

			response = await fetch(path, { cache: "no-store" });

			data = await response.json();
		}

		if (usernames[params.file[0]]) {
			const username = usernames[params.file[0]];

			if (params.file.length === 1) {
				path = username.api.replace("${}", "lens.json");
			} else if (params.file.length === 2) {
				path = username.api.replace("${}", `${params.file[1]}.json`);
			}

			response = await fetch(path, { cache: "no-store" });

			data = await response.json();
		}

		let schema;

		if (data.format === "article") {
			schema = article;
		} else {
			schema = profile;
		}

		const verification = verify({ schema, data });

		if (!verification.valid) {
			return new Response(
				JSON.stringify({
					errors: verification.errors.map((error) => error.message)
				}),
				{
					status: 400,
					headers: { "Content-Type": "application/json" }
				}
			);
		}

		return new Response(JSON.stringify(data), {
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		let status = error.status ? error.status : 500;
		let message = error.message
			? error.message
			: `${status}: An error has occured`;

		return new Response(message, {
			status: status,
			headers: { "Content-Type": "application/json" }
		});
	}
}
