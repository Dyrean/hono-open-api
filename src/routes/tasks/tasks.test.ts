
import { afterAll, beforeAll, describe, expect, expectTypeOf, it } from "vitest";
import { testClient } from "hono/testing";
import fs from "node:fs";
import router from "./tasks.index";
import env from "@/env";
import createApp from "@/lib/create-app";

if (env.NODE_ENV !== "test") {
    throw new Error("NODE_ENV must be 'test'");
}

const client = testClient(createApp().route("/", router));

describe("tasks routes", () => {
    beforeAll(async () => {
        Bun.spawnSync(["bun", "db:push"]);
    });

    afterAll(async () => {
        fs.rmSync("test.db", { force: true });
    });

	it("list", async () => {
        const response = await client.tasks.$get();
        expect(response.status).toBe(200);
        if (response.status === 200) {
            const json = await response.json();
            expectTypeOf(json).toBeArray();
            expect(json.length).toBe(1);
        }
	});
});
