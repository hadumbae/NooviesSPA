import {z} from "zod";
import {
    MovieQueryFilterSchema,
    MovieQueryOptionSchema,
    MovieQuerySortSchema
} from "@/pages/movies/schema/queries/MovieQueryOption.schema.ts";

/**
 * Type representing **movie query filter criteria**.
 *
 * - Inferred from {@link MovieQueryFilterSchema}.
 * - Used to narrow down search results by title, release date, and/or genres.
 * - All fields are optional, allowing partial filters.
 */
export type MovieQueryFilters = z.infer<typeof MovieQueryFilterSchema>;

/**
 * Type representing **movie query sort preferences**.
 *
 * - Inferred from {@link MovieQuerySortSchema}.
 * - Specifies how results should be ordered (e.g., by title, release date).
 * - Each sort key follows Mongoose sort conventions: `1` (ascending) or `-1` (descending).
 */
export type MovieQuerySorts = z.infer<typeof MovieQuerySortSchema>;

/**
 * Type representing **combined movie query filters and sorting**.
 *
 * - Inferred from {@link MovieQueryOptionSchema}.
 * - Bundles both filtering and sorting into a single object for database queries or API calls.
 * - Useful when both narrowing and ordering results in one request.
 */
export type MovieQueryOptions = z.infer<typeof MovieQueryOptionSchema>;