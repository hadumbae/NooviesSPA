/**
 * @file Zod schemas for validating Ipify API responses and cached data.
 * @filename IpifyPayload.schema.ts
 */

import { z } from "zod";
import { IpSchema } from "@/common/schema/strings/IpSchema.ts";
import { ISO3166Alpha2CountryCodeEnum } from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { TimezoneOffsetSchema } from "@/common/schema/strings/TimezoneOffsetSchema.ts";
import { BooleanValueSchema } from "@/common/schema/boolean/BooleanValueSchema.ts";

/**
 * Schema describing the location information returned by Ipify.
 */
export const IpifyLocationSchema = z.object({
    country: ISO3166Alpha2CountryCodeEnum,
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