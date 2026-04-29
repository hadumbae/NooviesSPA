/** @fileoverview Zod schema and type definitions for physical locations and geospatial data. */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {IANATimezoneSchema} from "@/common/schema/date-time/IANATimezone.schema.ts";
import {CoordinateSchema} from "@/common/_models/coordinate/CoordinateSchema.ts";

/** Zod schema for validating physical location data including address and coordinates. */
export const LocationSchema = z.object({
    street: NonEmptyStringSchema
        .max(2000, {message: "Must be 2000 characters or less."})
        .optional(),
    city: NonEmptyStringSchema
        .max(500, {message: "Must be 500 characters or less."}),
    state: NonEmptyStringSchema
        .max(500, {message: "Must be 500 characters or less."})
        .optional(),
    country: ISO3166Alpha2CountryCodeEnum,
    postalCode: NonEmptyStringSchema.optional(),
    timezone: IANATimezoneSchema,
    coordinates: CoordinateSchema.optional(),
});

/** Physical location data inferred from the location schema. */
export type Location = z.infer<typeof LocationSchema>;