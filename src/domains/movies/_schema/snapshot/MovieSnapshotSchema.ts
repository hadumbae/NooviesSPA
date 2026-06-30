/**
 * @fileoverview Defines the schema and type for a movie snapshot.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {URLStringSchema} from "@/common/schema/strings/URLStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {UTCISO8601DateTimeSchema} from "@/common/schema/date-time/iso-8601/UTCISO8601DateTimeSchema.ts";
import {MovieTaglineSchema, MovieTitleSchema} from "@/domains/movies";

/** Zod schema for validating movie snapshot data. */
export const MovieSnapshotSchema = z.object({
    title: MovieTitleSchema,
    originalTitle: MovieTitleSchema.optional(),
    tagline: MovieTaglineSchema.optional().nullable(),
    posterURL: URLStringSchema.optional().nullable(),
    releaseDate: UTCISO8601DateTimeSchema.optional().nullable(),
    genres: generateArraySchema(NonEmptyStringSchema.max(150, "Must be 150 characters or less.")),
    runtime: PositiveNumberSchema.lte(500, "Must be 500 or less."),
    country: ISO3166Alpha2CountryCodeEnum,
});

/** Data structure representing a movie snapshot. */
export type MovieSnapshot = z.infer<typeof MovieSnapshotSchema>;