/**
 * @fileoverview Schema and type definitions for paginated Genre API responses.
 * Extends the base Genre schema with standard pagination metadata for collection views.
 */

import {z} from "zod";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {GenreSchema} from "@/domains/genres/schema/genre/GenreSchema.ts";

/**
 * Validation schema for paginated genre data.
 */
export const PaginatedGenresSchema = generatePaginationSchema(GenreSchema);

/**
 * TypeScript type inferred from {@link PaginatedGenresSchema}.
 */
export type PaginatedGenres = z.infer<typeof PaginatedGenresSchema>;