/** @fileoverview Zod schema for validating theatre browsing search parameters. */

import {z} from "zod";
import {LocationTargetSchema} from "@/common/_schemas/strings/location-strings/LocationTargetSchema.ts";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";
import {AnyValues} from "@/common/types";

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

/**
 * Type representing the form-safe values for the theatre browse interface.
 */
export type BrowseTheatreParamFormStarterValues = AnyValues<BrowseTheatreParams>;