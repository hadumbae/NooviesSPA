/**
 * @fileoverview Zod schema and type definitions for movie summary projections.
 */

import {MovieBaseSchema} from "@/domains/movies/_schema/movie/MovieSchema.ts";
import {z} from "zod";

/** Zod schema for validating movie summary attributes. */
export const MovieSummarySchema = MovieBaseSchema.pick({
    _id: true,
    slug: true,
    title: true,
    tagline: true,
    genres: true,
    runtime: true,
    posterImage: true,
    releaseDate: true,
});

/** Inferred type for a validated movie summary document. */
export type MovieSummary = z.infer<typeof MovieSummarySchema>;