/** @fileoverview Zod schemas and type definitions for location form validation. */

import {z} from "zod";
import {CoordinateFormSchema,} from "@/common/_models/coordinate-form/CoordinateFormSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {IANATimezoneSchema} from "@/common/schema/date-time/IANATimezone.schema.ts";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";

/** Base validation schema for location and address fields. */
export const LocationFormBaseSchema = z.object({
    street: NonEmptyStringSchema.optional(),
    city: NonEmptyStringSchema,
    state: NonEmptyStringSchema.optional(),
    country: ISO3166Alpha2CountryCodeEnum,
    postalCode: NonEmptyStringSchema.optional(),
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