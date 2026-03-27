/**
 * @file Zod schema defining an immutable theatre snapshot for historical records.
 * @filename TheatreSnapshotSchema.ts
 */

import { z } from "zod";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { ISO3166Alpha2CountryCodeEnum } from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import { IANATimezoneSchema } from "@/common/schema/date-time/IANATimezone.schema.ts";

/**
 * Represents the finalized state of a theatre at the moment of a transaction or event.
 */
export const TheatreSnapshotSchema = z.object({
    /** The display name of the venue; capped at 255 characters. */
    name: NonEmptyStringSchema.max(255, "Must be 255 characters or less."),

    /** Optional street address; constrained to 2000 characters for complex international addresses. */
    street: NonEmptyStringSchema
        .max(2000, { message: "Must be 2000 characters or less." })
        .optional(),

    /** The city of operation; constrained to 500 characters. */
    city: NonEmptyStringSchema
        .max(500, { message: "Must be 500 characters or less." }),

    /** Optional state, province, or region; constrained to 500 characters. */
    state: NonEmptyStringSchema
        .max(500, { message: "Must be 500 characters or less." })
        .optional(),

    /** Standardized 2-letter country code (ISO 3166-1 alpha-2). */
    country: ISO3166Alpha2CountryCodeEnum,

    /** Optional postal or ZIP code for the theatre location. */
    postalCode: NonEmptyStringSchema.optional(),

    /** Validated IANA timezone identifier (e.g., "America/New_York") for local time calculations. */
    timezone: IANATimezoneSchema,
});

/**
 * TypeScript type inferred from {@link TheatreSnapshotSchema}.
 */
export type TheatreSnapshot = z.infer<typeof TheatreSnapshotSchema>;