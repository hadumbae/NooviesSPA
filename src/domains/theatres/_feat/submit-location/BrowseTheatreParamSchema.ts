/**
 * @fileoverview Zod schemas and inferred types for theatre browse query parameters and form values.
 */

import {z} from "zod";
import {LocationTargetSchema} from "@/common/schema/strings/LocationTargetSchema.ts";

/**
 * Validates URL query parameters used to filter theatre browse results by location target.
 */
export const BrowseTheatreParamSchema = z.object({
    target: LocationTargetSchema.optional(),
});

/**
 * Type representing the validated query parameters for browsing theatres.
 */
export type BrowseTheatreParams = z.infer<typeof BrowseTheatreParamSchema>;