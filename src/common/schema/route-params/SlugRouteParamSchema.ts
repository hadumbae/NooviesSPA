import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * Route parameter schema for slug-based routes.
 *
 * Ensures a non-empty `slug` string is provided in route params.
 */
export const SlugRouteParamSchema = z.object(
    { slug: NonEmptyStringSchema },
    { message: "Must be a collection of route parameters." },
);

/**
 * Inferred type for slug route parameters.
 */
export type SlugRouteParamObject = z.infer<typeof SlugRouteParamSchema>;
