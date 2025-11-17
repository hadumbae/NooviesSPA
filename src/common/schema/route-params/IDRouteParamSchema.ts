import { z } from "zod";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Schema for route parameters that require an `_id` field.
 *
 * Ensures that the `_id` parameter is a valid object ID string according to
 * {@link IDStringSchema}.
 *
 * Usage:
 * - Validates route parameters passed to API endpoints or React Router routes.
 * - Can be used with `zod` parsing or safe parsing methods (`parse`, `safeParse`).
 *
 * Example:
 * ```ts
 * const params = IDRouteParamSchema.parse({ _id: "64b8f1a2c9e123456789abcd" });
 * // params._id is now guaranteed to be a valid ID string
 * ```
 */
export const IDRouteParamSchema = z.object(
    { _id: IDStringSchema },
    { message: "Must be a collection of route parameters." },
);

/**
 * Type inferred from {@link IDRouteParamSchema}.
 *
 * Represents an object with a single `_id` string property, validated by the schema.
 */
export type IDRouteParamObject = z.infer<typeof IDRouteParamSchema>;
