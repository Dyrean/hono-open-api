import { apiReference } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "@/lib/types";

import { version } from "../../package.json";

export default function configureOpenAPI(app: AppOpenAPI) {
	// The OpenAPI documentation will be available at /doc
	app.doc("/doc", {
		openapi: "3.0.0",
		info: {
			version,
			title: "Tasks API",
		},
	});

	app.get(
		"/reference",
		apiReference({
			theme: "kepler",
			layout: "classic",
			defaultHttpClient: {
				targetKey: "javascript",
				clientKey: "fetch",
			},
			spec: {
				url: "/doc",
			},
		}),
	);
}
