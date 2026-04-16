/**
 * @fileoverview Zod schemas for validating genre query parameters.
 * These schemas define the shape and validation rules for both filtering
 * and sorting options used in genre-related queries.
 */

import {z} from "zod";
import {GenreQueryFilterSchema, GenreQuerySortSchema} from "@/domains/genres/schema";

/**
 * Combined schema including both filter and sorting options for genre queries.
 */
export const GenreQueryOptionSchema = GenreQueryFilterSchema.merge(GenreQuerySortSchema);

/**
 * Combined type representing all valid query parameters (both filtering and sorting).
 */
export type GenreQueryOptions = z.infer<typeof GenreQueryOptionSchema>;