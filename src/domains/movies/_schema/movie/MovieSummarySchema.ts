/**
 * @fileoverview Zod schema and type definitions for movie summary projections.
 */

import {MovieBaseSchema} from "@/domains/movies/_schema/movie/MovieSchema.ts";
import {z} from "zod";
import {generateArraySchema} from "@/common/_feat";
import {GenreSchema} from "@/domains/genres";

/** Zod schema for validating movie summary attributes. */
export const MovieSummarySchema = MovieBaseSchema.pick({
    _id: true,
    slug: true,
    title: true,
    tagline: true,
    runtime: true,
    posterImage: true,
    releaseDate: true,
}).extend({
    genres: generateArraySchema(GenreSchema)
});

/** Inferred type for a validated movie summary document. */
export type MovieSummary = z.infer<typeof MovieSummarySchema>;