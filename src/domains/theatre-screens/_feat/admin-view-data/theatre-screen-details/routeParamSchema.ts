/** @fileoverview Zod schema and type for theatre screen route parameters. */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/_schemas";

/** Zod schema for validating route parameters identifying a specific theatre screen. */
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

/** TypeScript type for theatre screen route parameters. */
export type TheatreScreenDetailsRouteParams =
    z.infer<typeof TheatreScreenDetailsRouteParamSchema>;