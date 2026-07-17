/**
 * @fileoverview Defines the schema and type for location data returned by the Ipify API.
 */

import {z} from "zod";
import {ISO3166Alpha2CountryCodeSchema} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema";
import {NonEmptyStringSchema} from "@/common/_schemas/strings/simple-strings/NonEmptyStringSchema";
import {TimezoneOffsetSchema} from "@/common/_schemas/strings/location-strings/TimezoneOffsetSchema";

/** Zod validation schema for the Ipify location object. */
export const IpifyLocationSchema = z.object({
    country: ISO3166Alpha2CountryCodeSchema,
    region: NonEmptyStringSchema,
    timezone: TimezoneOffsetSchema,
});

/** Type definition for the Ipify location object. */
export type IpifyLocation = z.infer<typeof IpifyLocationSchema>;