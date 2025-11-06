import {ZodTypeAny, ZodObject} from "zod";

/**
 * Checks whether a given Zod schema instance is a {@link ZodObject}.
 *
 * @param schema - The Zod schema to test.
 * @returns `true` if the provided schema is a `ZodObject`; otherwise, `false`.
 *
 * @example
 * ```ts
 * import { z } from "zod";
 * import isZodObjectSchema from "./isZodObjectSchema";
 *
 * const userSchema = z.object({ name: z.string() });
 * const stringSchema = z.string();
 *
 * console.log(isZodObjectSchema(userSchema)); // true
 * console.log(isZodObjectSchema(stringSchema)); // false
 * ```
 *
 * @remarks
 * This utility is useful when working with dynamically typed Zod schemas
 * to determine if a given instance represents an object schema
 * before performing operations that require object-specific parsing or shape access.
 */
export default function isZodObjectSchema(schema: ZodTypeAny): boolean {
    return schema instanceof ZodObject;
}
