/**
 * @fileoverview Type definitions inferred from Genre query schemas.
 * These types mirror the Zod schemas used for validating filter, sort,
 * and combined query options in genre-related API endpoints.
 */

import { z } from "zod";
import {
    GenreQueryFilterSchema,
    GenreQuerySortSchema,
    GenreQueryOptionSchema,
} from "@/pages/genres/schema/filters/GenreQueryOptions.schema.ts";

/**
 * Type representing valid filter parameters for genre queries.
 * Derived from {@link GenreQueryFilterSchema}.
 */
export type GenreQueryFilters = z.infer<typeof GenreQueryFilterSchema>;

/**
 * Type representing valid sorting parameters for genre queries.
 * Derived from {@link GenreQuerySortSchema}.
 */
export type GenreQuerySorts = z.infer<typeof GenreQuerySortSchema>;

/**
 * Combined type representing all valid query parameters
 * (both filtering and sorting) for genre queries.
 * Derived from {@link GenreQueryOptionSchema}.
 */
export type GenreQueryOptions = z.infer<typeof GenreQueryOptionSchema>;
