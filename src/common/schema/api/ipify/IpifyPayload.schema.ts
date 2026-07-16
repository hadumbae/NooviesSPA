/**
 * @file Zod schemas for validating Ipify API responses and cached data.
 * @filename IpifyPayload.schema.ts
 */

import { z } from "zod";
import { IpSchema } from "@/common/_schemas/strings/ip-string/IpSchema.ts";
import { ISO3166Alpha2CountryCodeSchema } from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema.ts";
import { NonEmptyStringSchema } from "@/common/_schemas/strings/simple-strings/NonEmptyStringSchema.ts";
import { TimezoneOffsetSchema } from "@/common/_schemas/strings/location-strings/TimezoneOffsetSchema.ts";
import { BooleanValueSchema } from "@/common/_schemas/boolean/BooleanValueSchema.ts";

/**
 * Schema describing the location information returned by Ipify.
 */
export const IpifyLocationSchema = z.object({
    country: ISO3166Alpha2CountryCodeSchema,
    region: NonEmptyStringSchema,
    timezone: TimezoneOffsetSchema,
});

/**
 * Schema for the Ipify API payload.
 */
export const IpifyPayloadSchema = z.object({
    ip: IpSchema,
    location: IpifyLocationSchema,
    isp: NonEmptyStringSchema,
});

/**
 * Schema describing the Ipify data persisted in local storage.
 */
export const IpifyLocalStorageSchema = z.object({
    fetched: BooleanValueSchema,
    payload: IpifyPayloadSchema.nullable(),
});