/**
 * @fileoverview Zod schema for validating React Router parameters on the Screen Details page.
 * Ensures that the theatre and screen slugs are present and correctly formatted.
 */

import {z} from "zod";
import {NonEmptyStringSchema}
    from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * Route parameters required to identify a specific screen within a theatre hierarchy.
 */
export const TheatreScreenDetailsRouteParamSchema = z.object(
    {
        theatreSlug: NonEmptyStringSchema,
        screenSlug: NonEmptyStringSchema,
    },
    {
        required_error: "Route parameters are required.",
        invalid_type_error: "Must be a valid object containing theatre and screen slugs.",
    }
);

/**
 * TypeScript type inferred from {@link TheatreScreenDetailsRouteParamSchema}.
 */
export type TheatreScreenDetailsRouteParams =
    z.infer<typeof TheatreScreenDetailsRouteParamSchema>;