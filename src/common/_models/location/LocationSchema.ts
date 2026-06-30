/** @fileoverview Zod schema and type definitions for physical locations and geospatial data. */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {IANATimezoneSchema} from "@/common/schema/date-time/IANATimezone.schema.ts";
import {CoordinateSchema} from "@/common/_models/coordinate/CoordinateSchema.ts";
import {StreetStringSchema} from "@/common/_models/location/StreetStringSchema.ts";
import {CityStringSchema} from "@/common/_models/location/CityStringSchema.ts";
import {StateStringSchema} from "@/common/_models/location/StateStringSchema.ts";

/** Zod schema for validating physical location data including address and coordinates. */
export const LocationSchema = z.object({
    street: StreetStringSchema.optional(),
    city: CityStringSchema,
    state: StateStringSchema.optional(),
    country: ISO3166Alpha2CountryCodeEnum,
    postalCode: NonEmptyStringSchema.optional(),
    timezone: IANATimezoneSchema,
    coordinates: CoordinateSchema.optional(),
});

/** Physical location data inferred from the location schema. */
export type Location = z.infer<typeof LocationSchema>;