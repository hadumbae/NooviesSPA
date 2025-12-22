/**
 * @file MovieSnapshotSchema.ts
 *
 * @description
 * Zod schema defining an immutable movie snapshot.
 *
 * Represents the finalized state of a movie at the time it is embedded into
 * other domain snapshots (e.g. showings, reservations, historical records).
 * This ensures movie-related data remains consistent even if the source movie
 * entity changes later.
 *
 * Intended usage:
 * - Embedding within showing snapshots
 * - Embedding within reservation snapshots
 * - Read-only snapshot validation and typing
 */

import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { URLStringSchema } from "@/common/schema/strings/URLStringSchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { ISO3166Alpha2CountryCodeEnum } from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import { z } from "zod";
import {DateOnlyStringSchema} from "@/common/schema/dates/DateOnlyStringSchema.ts";

/**
 * Movie snapshot schema.
 */
export const MovieSnapshotSchema = z.object({
    /** Display title of the movie. */
    title: NonEmptyStringSchema.max(250, "Must be 250 characters or less."),

    /** Original (non-localized) title of the movie, if different. */
    originalTitle: NonEmptyStringSchema
        .max(250, "Must be 250 characters or less.")
        .optional(),

    /** Optional marketing tagline for the movie. */
    tagline: NonEmptyStringSchema
        .max(100, "Must be 100 characters or less.")
        .optional()
        .nullable(),

    /** URL to the movie poster image. */
    posterURL: URLStringSchema.optional().nullable(),

    /** Official release date in UTC ISO-8601 format. */
    releaseDate: DateOnlyStringSchema.optional().nullable(),

    /** List of genre labels associated with the movie. */
    genres: generateArraySchema(
        NonEmptyStringSchema.max(150, "Must be 150 characters or less."),
    ),

    /** Runtime of the movie in minutes. */
    runtime: PositiveNumberSchema.lte(500, "Must be 500 or less."),

    /** ISO 3166-1 alpha-2 country code of origin. */
    country: ISO3166Alpha2CountryCodeEnum,
});

/**
 * TypeScript type inferred from {@link MovieSnapshotSchema}.
 */
export type MovieSnapshot = z.infer<typeof MovieSnapshotSchema>;
