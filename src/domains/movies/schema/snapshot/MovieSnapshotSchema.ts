/**
 * @file Zod schema defining an immutable movie snapshot for historical records.
 * @filename MovieSnapshotSchema.ts
 */

import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { URLStringSchema } from "@/common/schema/strings/URLStringSchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { ISO3166Alpha2CountryCodeEnum } from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import { z } from "zod";
import {UTCISO8601DateTimeSchema} from "@/common/schema/date-time/iso-8601/UTCISO8601DateTimeSchema.ts";

/**
 * Represents the finalized state of a movie at the time of a transaction or event.
 */
export const MovieSnapshotSchema = z.object({
    /** Localized display title; capped at 250 characters. */
    title: NonEmptyStringSchema.max(250, "Must be 250 characters or less."),

    /** Original title in the native language, if different from the display title. */
    originalTitle: NonEmptyStringSchema
        .max(250, "Must be 250 characters or less.")
        .optional(),

    /** Short marketing catchphrase; constrained to 100 characters. */
    tagline: NonEmptyStringSchema
        .max(100, "Must be 100 characters or less.")
        .optional()
        .nullable(),

    /** Validated link to the movie's promotional artwork. */
    posterURL: URLStringSchema.optional().nullable(),

    /** Official global release date stored in UTC ISO-8601 format. */
    releaseDate: UTCISO8601DateTimeSchema.optional().nullable(),

    /** Array of genre tags, each limited to 150 characters. */
    genres: generateArraySchema(
        NonEmptyStringSchema.max(150, "Must be 150 characters or less."),
    ),

    /** Duration of the film in minutes; capped at 500 (approx. 8.3 hours). */
    runtime: PositiveNumberSchema.lte(500, "Must be 500 or less."),

    /** Standardized 2-letter country code (ISO 3166-1 alpha-2). */
    country: ISO3166Alpha2CountryCodeEnum,
});

/**
 * TypeScript type inferred from {@link MovieSnapshotSchema}.
 */
export type MovieSnapshot = z.infer<typeof MovieSnapshotSchema>;