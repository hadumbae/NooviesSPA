import {z} from "zod";
import {
    GenreQueryFilterSchema,
    GenreQueryOptionSchema,
    GenreQuerySortSchema
} from "@/pages/genres/schema/filters/GenreFilter.schema.ts";

/**
 * **GenreQueryFilters**
 *
 * Type inferred from {@link GenreQueryFilterSchema}.
 * Represents the validated shape of filter query parameters
 * when querying genres.
 *
 * - `name` (optional):
 *   - String between 3 and 255 characters.
 *   - Used to filter genres by name.
 *
 * @example
 * ```ts
 * const filters: GenreQueryFilters = { name: "Rock" };
 * ```
 */
export type GenreQueryFilters = z.infer<typeof GenreQueryFilterSchema>;

/**
 * **GenreQuerySorts**
 *
 * Type inferred from {@link GenreQuerySortSchema}.
 * Represents the validated shape of sort query parameters
 * when sorting genre results.
 *
 * - `sortByName` (optional):
 *   - Accepts values defined by `MongooseSortOrderSchema`
 *     (e.g., `1` for ascending, `-1` for descending).
 *
 * @example
 * ```ts
 * const sorts: GenreQuerySorts = { sortByName: 1 };
 * ```
 */
export type GenreQuerySorts = z.infer<typeof GenreQuerySortSchema>;

/**
 * **GenreQueryOptions**
 *
 * Type inferred from {@link GenreQueryOptionSchema}.
 * Represents the combined validated shape of both filter and sort query parameters
 * for genre queries.
 *
 * - Includes all fields from:
 *   - `GenreQueryFilters`
 *   - `GenreQuerySorts`
 *
 * @example
 * ```ts
 * const options: GenreQueryOptions = {
 *   name: "Rock",
 *   sortByName: 1
 * };
 * ```
 */
export type GenreQueryOptions = z.infer<typeof GenreQueryOptionSchema>;