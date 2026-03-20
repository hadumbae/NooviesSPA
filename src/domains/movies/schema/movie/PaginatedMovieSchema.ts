/**
 * @file Pagination schema for basic movie records.
 * @filename PaginatedMovieSchema.ts
 */

import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {MovieSchema} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {z} from "zod";

/**
 * Validated pagination wrapper for {@link MovieSchema}.
 * * @remarks
 * Uses {@link generatePaginationSchema} to attach standard metadata fields
 * (e.g., totalItems, perPage, totalPages) to an array of basic Movie objects.
 * * This schema is typically used for administrative tables or lightweight
 * lists where full genre population isn't required.
 */
export const PaginatedMovieSchema = generatePaginationSchema(MovieSchema);

/**
 * TypeScript type inferred from {@link PaginatedMovieSchema}.
 * * Represents a single page of {@link Movie} objects along with navigation metadata.
 */
export type PaginatedMovies = z.infer<typeof PaginatedMovieSchema>;