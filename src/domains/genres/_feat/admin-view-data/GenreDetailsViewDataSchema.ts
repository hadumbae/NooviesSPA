/**
 * @fileoverview Zod validation schema and type definitions for aggregated Genre view data.
 * Validates the response structure for the Genre Details administrative page,
 * including nested paginated movie data.
 */

import {z} from "zod";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {MovieWithGenresSchema} from "@/domains/movies/schema/movie/MovieWithGenresSchema.ts";
import {GenreSchema} from "@/domains/genres/schema";

/**
 * Internal schema representing the detail-specific aggregates for a genre.
 */
const GenreDetailsSchema = z.object(
    {
        movies: generatePaginationSchema(MovieWithGenresSchema),
    },
    {message: "Must be a valid details object for genres."},
);

/**
 * Top-level validation schema for the Genre Details administrative view data.
 */
export const GenreDetailsViewDataSchema = z.object({
    genre: GenreSchema,
    details: GenreDetailsSchema,
});

/**
 * TypeScript type inferred from {@link GenreDetailsViewDataSchema}.
 */
export type GenreDetailsViewData = z.infer<typeof GenreDetailsViewDataSchema>;