/** @fileoverview Zod schemas and type definitions for location form validation. */

import {z} from "zod";
import {CoordinateFormSchema,} from "@/common/_models/coordinate-form/CoordinateFormSchema.ts";
import {IANATimezoneSchema} from "@/common/_schemas/time/IANATimezoneSchema.ts";
import {ISO3166Alpha2CountryCodeSchema} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema.ts";
import {CityStringSchema, PostalCodeSchema, StateStringSchema, StreetStringSchema} from "@/common/_models/location";

/** Base validation schema for location and address fields. */
export const LocationFormBaseSchema = z.object({
    street: StreetStringSchema.optional(),
    city: CityStringSchema,
    state: StateStringSchema.optional(),
    country: ISO3166Alpha2CountryCodeSchema,
    postalCode: PostalCodeSchema.optional(),
    timezone: IANATimezoneSchema,
});

const LocationFormIncludeCoordinatesSchema = LocationFormBaseSchema.extend({
    includeCoordinates: z.literal(true),
    coordinates: CoordinateFormSchema,
});

const LocationFormNoCoordinatesSchema = LocationFormBaseSchema.extend({
    includeCoordinates: z.literal(false),
});

/**
 * Validation schema for the location form that conditionally requires coordinates.
 */
export const LocationFormSchema = z.discriminatedUnion(
    "includeCoordinates",
    [LocationFormIncludeCoordinatesSchema, LocationFormNoCoordinatesSchema]
);

/** Validated data structure submitted by the location form. */
export type LocationFormData = z.infer<typeof LocationFormSchema>;