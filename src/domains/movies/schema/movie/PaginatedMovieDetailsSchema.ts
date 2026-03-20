/**
 * @file Pagination schema for detailed movie records.
 * @filename PaginatedMovieDetailsSchema.ts
 */

import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {MovieDetailsSchema} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {z} from "zod";

/**
 * Validated pagination wrapper for {@link MovieDetailsSchema}.
 * * @remarks
 * Uses {@link generatePaginationSchema} to attach standard metadata fields
 * (e.g., totalItems, perPage, totalPages) to an array of {@link MovieDetails}.
 * * This schema is the standard for public-facing movie galleries where
 * rich metadata like populated genres is required for the initial render.
 */
export const PaginatedMovieDetailsSchema = generatePaginationSchema(MovieDetailsSchema);

/**
 * TypeScript type inferred from {@link PaginatedMovieDetailsSchema}.
 * * Represents a single page of {@link MovieDetails} objects, including navigation
 * metadata and fully resolved relational fields.
 */
export type PaginatedMovieDetails = z.infer<typeof PaginatedMovieDetailsSchema>;