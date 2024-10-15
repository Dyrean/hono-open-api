import { createRoute, z } from "node_modules/@hono/zod-openapi/dist";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import { insertTasksSchema, patchTasksSchema, selectTasksSchema } from "@/db/schema";
import { notFoundSchema } from "@/lib/constants";

const tags = ["Tasks"];

export const list = createRoute({
	path: "/tasks",
	method: "get",
	tags,
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.array(selectTasksSchema),
			"The list of tasks",
		),
	},
});

export const create = createRoute({
	path: "/tasks",
	method: "post",
	tags,
	request: {
		body: jsonContentRequired(insertTasksSchema, "The task to create"),
	},
	responses: {
		[HttpStatusCodes.CREATED]: jsonContent(selectTasksSchema, "The created task"),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(insertTasksSchema),
			"The validation error(s)",
		),
	},
});

export const getOne = createRoute({
	path: "/tasks/{id}",
	method: "get",
	request: {
		params: z.object({
			id: z.string().min(16).openapi({
				description: "The id of the task",
				example: "Y7PheFgHYNBXQngS",
				param: {
					name: "id",
					in: "path",
				},
			}),
		}),
	},
	tags,
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			selectTasksSchema,
			"The task of the given id",
		),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(
			notFoundSchema,
			"The task not found",
		),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(IdParamsSchema),
			"Invalid id error",
		),
	},
});

export const patch = createRoute({
	path: "/tasks/{id}",
	method: "patch",
	tags,
	request: {
		params: z.object({
			id: z.string().min(16).openapi({
				description: "The id of the task",
				example: "Y7PheFgHYNBXQngS",
				param: {
					name: "id",
					in: "path",
				},
			}),
		}),
		body: jsonContentRequired(patchTasksSchema, "The updated task"),
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(selectTasksSchema, "The updated task"),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(
			notFoundSchema,
			"Task not found",
		),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(patchTasksSchema).or(createErrorSchema(IdParamsSchema)),
			"The validation error(s)",
		),
	},
});

export const remove = createRoute({
	path: "/tasks/{id}",
	method: "delete",
	tags,
	request: {
		params: z.object({
			id: z.string().min(16).openapi({
				description: "The id of the task",
				example: "Y7PheFgHYNBXQngS",
				param: {
					name: "id",
					in: "path",
				},
			}),
		}),
	},
	responses: {
		[HttpStatusCodes.NO_CONTENT]: {
			description: "The task deleted",
		},
		[HttpStatusCodes.NOT_FOUND]: jsonContent(
			notFoundSchema,
			"Task not found",
		),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(IdParamsSchema),
			"The validation error",
		),
	},
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
