/**
 * @file ScreenDetailsRouteParamSchema.ts
 *
 * Zod schema for validating route parameters
 * used by the Screen Details page.
 */

import {z} from "zod";
import {NonEmptyStringSchema}
    from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * Route parameters required to resolve a screen
 * within a theatre context.
 */
export const ScreenDetailsRouteParamSchema = z.object(
    {
        /** Theatre identifier (slug) */
        theatreSlug: NonEmptyStringSchema,

        /** Screen identifier (slug) */
        screenSlug: NonEmptyStringSchema,
    },
    {
        required_error: "Required.",
        invalid_type_error: "Must be a collection of route parameters.",
    }
);

/**
 * Inferred type for screen detail route parameters.
 */
export type ScreenDetailsRouteParams =
    z.infer<typeof ScreenDetailsRouteParamSchema>;
