/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value: `default-src 'self'; img-src 'self' https: data:; media-src 'self' https: data:; script-src 'self' 'unsafe-inline' ${process.env.NODE_ENV === "development" && "'unsafe-eval'"} https: data:; frame-src 'self' https: data:; style-src 'self' 'unsafe-inline'; connect-src 'self' https: data:; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;`
					},
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "X-Frame-Options", value: "DENY" },
					{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
					{
						key: "Permissions-Policy",
						value:
							"geolocation=(), microphone=(), camera=(), payment=(), clipboard-read=(), accelerometer=(), gyroscope=(), magnetometer=(), usb=(), bluetooth=(), serial=(), sync-xhr=()"
					},
					{ key: "Cross-Origin-Opener-Policy", value: "same-origin" },
					{ key: "Cross-Origin-Resource-Policy", value: "same-origin" }
				]
			}
		];
	}
};

export default nextConfig;
