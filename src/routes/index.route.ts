import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import { createRouter } from "@/lib/create-app";

const router = createRouter()
    .openapi(createRoute({
        tags: ["Index"],
        method: "get",
        path: "/",
        responses: {
            [HttpStatusCodes.OK]: jsonContent(
                z.object({
                    message: z.string(),
                }).openapi({
                    example: {
                        message: "Tasks API",
                    },
                }),
                "Tasks API Index",
            ),
        },
    }), (c) => {
        return c.json({
            message: "Tasks API",
        }, HttpStatusCodes.OK);
    });

export default router;
