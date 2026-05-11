/** @fileoverview Zod schema for validating theatre browsing search parameters. */

import {z} from "zod";
import {LocationTargetSchema} from "@/common/schema/strings/LocationTargetSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";

/**
 * Schema for validating the theatre location search target.
 */
export const BrowseTheatreParamSchema = z.object({
    target: preprocessEmptyStringToUndefined(
        LocationTargetSchema.optional(),
    ).optional(),
});

/** Type definition for theatre browsing parameters. */
export type BrowseTheatreParams = z.infer<typeof BrowseTheatreParamSchema>;