/**
 * @fileoverview Defines the schema and type for a movie snapshot.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {URLStringSchema} from "@/common/_schemas/strings/simple-strings/URLStringSchema.ts";
import {ISO3166Alpha2CountryCodeSchema} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema.ts";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {ISO8601DateTimeSchema} from "@/common/_schemas/iso-8601/ISO8601DateTimeSchema.ts";
import {MovieTaglineSchema, MovieTitleSchema} from "@/domains/movies";
import {PositiveNumberSchema} from "@/common/_schemas/numbers/positive-number/PositiveNumberSchema";

/** Zod schema for validating movie snapshot data. */
export const MovieSnapshotSchema = z.object({
    title: MovieTitleSchema,
    originalTitle: MovieTitleSchema.optional(),
    tagline: MovieTaglineSchema.optional().nullable(),
    posterURL: URLStringSchema.optional().nullable(),
    releaseDate: ISO8601DateTimeSchema.optional().nullable(),
    genres: generateArraySchema(NonEmptyStringSchema.max(150, "Must be 150 characters or less.")),
    runtime: PositiveNumberSchema.lte(500, "Must be 500 or less."),
    country: ISO3166Alpha2CountryCodeSchema,
});

/** Data structure representing a movie snapshot. */
export type MovieSnapshot = z.infer<typeof MovieSnapshotSchema>;