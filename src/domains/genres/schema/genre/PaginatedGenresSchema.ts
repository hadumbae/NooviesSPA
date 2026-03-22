/**
 * @file Schema and type definitions for paginated Genre API responses.
 * @filename PaginatedGenresSchema.ts
 */

import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {GenreSchema} from "@/domains/genres/schema/genre/GenreSchema.ts";
import {z} from "zod";

/**
 * Validation schema for paginated genre data.
 * * * **Structure:** Wraps {@link GenreSchema} with standard pagination metadata (total, limit, page).
 */
export const PaginatedGenresSchema = generatePaginationSchema(GenreSchema);

/**
 * TypeScript type inferred from {@link PaginatedGenresSchema}.
 * * Represents a structured response for list views and administrative tables.
 */
export type PaginatedGenres = z.infer<typeof PaginatedGenresSchema>;