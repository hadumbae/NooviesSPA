/**
 * @file TheatreSnapshotSchema.ts
 *
 * @description
 * Zod schema defining an immutable theatre snapshot.
 *
 * Represents the finalized, persisted state of a theatre at the time it is
 * embedded into a higher-level snapshot (e.g. showings or reservations).
 * Captures identifying and location-based details such as name, address,
 * country, postal code, and timezone to prevent historical drift if the
 * underlying theatre record changes later.
 *
 * Intended usage:
 * - Embedding within showing snapshots
 * - Embedding within reservation snapshots
 * - Read-only snapshot validation and typing
 */

import { z } from "zod";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { ISO3166Alpha2CountryCodeEnum } from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import { IANATimezoneSchema } from "@/common/schema/date-time/IANATimezone.schema.ts";

/**
 * Theatre snapshot schema.
 */
export const TheatreSnapshotSchema = z.object({
    /** Name of the theatre (max 255 characters). */
    name: NonEmptyStringSchema.max(255, "Must be 255 characters or less."),

    /** Street address of the theatre (optional, max 2000 characters). */
    street: NonEmptyStringSchema
        .max(2000, { message: "Must be 2000 characters or less." })
        .optional(),

    /** City where the theatre is located (max 500 characters). */
    city: NonEmptyStringSchema
        .max(500, { message: "Must be 500 characters or less." }),

    /** State or province of the theatre (optional, max 500 characters). */
    state: NonEmptyStringSchema
        .max(500, { message: "Must be 500 characters or less." })
        .optional(),

    /** ISO 3166-1 alpha-2 country code for the theatre. */
    country: ISO3166Alpha2CountryCodeEnum,

    /** Postal or ZIP code of the theatre (optional). */
    postalCode: NonEmptyStringSchema.optional(),

    /** IANA timezone identifier for the theatre. */
    timezone: IANATimezoneSchema,
});

/**
 * TypeScript type inferred from {@link TheatreSnapshotSchema}.
 */
export type TheatreSnapshot = z.infer<typeof TheatreSnapshotSchema>;
