/**
 * @fileoverview Zod schema and type definitions for genre summary projections.
 */

import {GenreSchema} from "@/domains/genres/_schema/genre/GenreSchema.ts";
import {z} from "zod";
import {generateArraySchema} from "@/common/_feat";
import {MovieSummarySchema} from "@/domains/movies/_schema/movie/MovieSummarySchema.ts";

/** Zod schema for validating genre summary attributes. */
export const GenreSummarySchema = GenreSchema.pick({
    _id: true,
    name: true,
    description: true,
    slug: true,
}).extend({
    movies: generateArraySchema(MovieSummarySchema)
});

/** Inferred type for a validated genre summary document. */
export type GenreSummary = z.infer<typeof GenreSummarySchema>;