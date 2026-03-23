/**
 * @file Zod validation schema and type definitions for aggregated Genre view data.
 * @filename GenreDetailsViewDataSchema.ts
 */

import {z} from "zod";
import {GenreSchema} from "@/domains/genres/schema/genre/GenreSchema.ts";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {MovieWithGenresSchema} from "@/domains/movies/schema/movie/MovieWithGenresSchema.ts";

/**
 * Internal schema representing the detail-specific aggregates for a genre.
 */
const GenreDetails = z.object(
    {movies: generatePaginationSchema(MovieWithGenresSchema)},
    {message: "Must be a valid details object for genres."},
);

/**
 * Top-level validation schema for the Genre Details administrative view data.
 */
export const GenreDetailsViewDataSchema = z.object({
    /** The primary genre metadata (ID, name, slug, etc.). */
    genre: GenreSchema,
    /** The nested details containing the paginated movie catalog for this genre. */
    details: GenreDetails,
});

/**
 * TypeScript type inferred from {@link GenreDetailsViewDataSchema}.
 * * Represents the fully hydrated data structure required by the Genre Details page.
 */
export type GenreDetailsViewData = z.infer<typeof GenreDetailsViewDataSchema>;