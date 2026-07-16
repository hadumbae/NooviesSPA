/** @fileoverview Zod schema and type definitions for physical locations and geospatial data. */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {ISO3166Alpha2CountryCodeSchema} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema.ts";
import {IANATimezoneSchema} from "@/common/_schemas/time/IANATimezoneSchema.ts";
import {CoordinateSchema} from "@/common/_models/coordinate/CoordinateSchema.ts";
import {StreetStringSchema} from "@/common/_models/location/StreetStringSchema.ts";
import {CityStringSchema} from "@/common/_models/location/CityStringSchema.ts";
import {StateStringSchema} from "@/common/_models/location/StateStringSchema.ts";

/** Zod schema for validating physical location data including address and coordinates. */
export const LocationSchema = z.object({
    street: StreetStringSchema.optional(),
    city: CityStringSchema,
    state: StateStringSchema.optional(),
    country: ISO3166Alpha2CountryCodeSchema,
    postalCode: NonEmptyStringSchema.optional(),
    timezone: IANATimezoneSchema,
    coordinates: CoordinateSchema.optional(),
});

/** Physical location data inferred from the location schema. */
export type Location = z.infer<typeof LocationSchema>;