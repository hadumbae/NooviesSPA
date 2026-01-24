/**
 * @file LocationTargetSchema.ts
 *
 * Zod schema and inferred type for a generic location target.
 *
 * Used for flexible location-based filtering where a structured
 * location (city/state) is not required.
 */

import {z} from "zod";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * Location target marker.
 *
 * Accepts either:
 * - An ISO 3166-1 alpha-2 country code
 * - A non-empty free-form location string (max 500 chars)
 */
export const LocationTargetSchema = z.union(
    [
        ISO3166Alpha2CountryCodeEnum,
        NonEmptyStringSchema.max(500, {
            message: "Must be 500 characters or less.",
        }),
    ],
    {message: "Must be a valid location target marker."},
);

/**
 * Inferred type for {@link LocationTargetSchema}.
 */
export type LocationTarget = z.infer<typeof LocationTargetSchema>;
