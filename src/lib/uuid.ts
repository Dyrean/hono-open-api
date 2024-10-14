import { customAlphabet } from "nanoid";

export const nanoid = customAlphabet(
    "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
);

export function newId(prefix?: string) {
    return prefix ? `${prefix}_${nanoid(16)}` : nanoid(16);
}
