/**
 * @fileoverview Schema for validating location target markers.
 */

import {z} from "zod";
import {ISO3166Alpha2CountryCodeSchema} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema.ts";
import {NonEmptyStringSchema} from "@/common/_schemas/strings";

/** Zod schema for validating a location target marker. */
export const LocationTargetSchema = z.union(
    [
        ISO3166Alpha2CountryCodeSchema,
        NonEmptyStringSchema.max(500, {message: "Must be 500 characters or less."}),
    ],
    {message: "Must be a valid location target marker."},
);

/** Type representing a valid location target marker. */
export type LocationTarget = z.infer<typeof LocationTargetSchema>;
