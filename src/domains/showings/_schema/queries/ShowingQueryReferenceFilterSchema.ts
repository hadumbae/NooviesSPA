/**
 * @fileoverview Zod schema and TypeScript type for Showing reference filters.
 */

import {z} from "zod";
import {SlugStringSchema} from "@/common/_schemas/strings/slug-strings/SlugString.ts";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {ISO3166Alpha2CountryCodeSchema} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema.ts";

/** Zod schema for validating reference-based filter criteria for Showings. */
export const ShowingQueryReferenceFilterSchema = z.object({
    movieSlug: SlugStringSchema.optional(),
    theatreSlug: SlugStringSchema.optional(),
    screenSlug: SlugStringSchema.optional(),
    theatreState: NonEmptyStringSchema.max(500, {message: "Must be 500 characters or less."}).optional(),
    theatreCity: NonEmptyStringSchema.max(500, {message: "Must be 500 characters or less."}).optional(),
    theatreCountry: ISO3166Alpha2CountryCodeSchema.optional(),
});

/** Reference-based filter criteria for querying Showings. */
export type ShowingQueryReferenceFilters = z.infer<typeof ShowingQueryReferenceFilterSchema>;