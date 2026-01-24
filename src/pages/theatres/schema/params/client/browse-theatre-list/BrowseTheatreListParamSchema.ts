/**
 * @file BrowseTheatreListParam.schema.ts
 *
 * Zod schema and inferred type for theatre browse
 * list route parameters.
 *
 * Used by browse endpoints that resolve theatres
 * based on a location target.
 */

import {z} from "zod";
import {LocationTargetSchema} from "@/common/schema/strings/LocationTargetSchema.ts";

/**
 * Route parameters for browsing theatres by location.
 */
export const BrowseTheatreListParamSchema = z.object({
    /** Location target used to filter theatres */
    target: LocationTargetSchema.optional(),
});

/**
 * Inferred type for {@link BrowseTheatreListParamSchema}.
 */
export type BrowseTheatreListParams = z.infer<typeof BrowseTheatreListParamSchema>;
