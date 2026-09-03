/**
 * @fileoverview Zod schema and type definitions for grouping theatre screen showings under specific movies.
 */

import {z} from "zod";
import {MovieSummarySchema} from "@/domains/movies/_schema/movie/MovieSummarySchema.ts";
import {
    TheatreScreenShowingGroupSchema
} from "@/domains/theatres/_feat/client-view-data/theatre-info/TheatreScreenShowingGroupSchema.ts";
import {generateArraySchema} from "@/common/_feat";

/** Schema for validating a movie summary and its associated screen showing groups. */
export const TheatreMovieRuntimesSchema = z.object({
    movie: MovieSummarySchema,
    screens: generateArraySchema(TheatreScreenShowingGroupSchema),
});

/** Inferred TypeScript type representing a movie with grouped screen showings. */
export type TheatreMovieRuntimes = z.infer<typeof TheatreMovieRuntimesSchema>;