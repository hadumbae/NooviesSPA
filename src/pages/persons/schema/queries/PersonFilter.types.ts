import {z} from "zod";
import {
    PersonQueryFilterSchema,
    PersonQueryOptionsSchema,
    PersonQuerySortSchema
} from "@/pages/persons/schema/queries/PersonFilter.schema.ts";

/**
 * Type representing the filter criteria used for querying Person records.
 *
 * Corresponds to {@link PersonQueryFilterSchema}. Used to narrow down search results
 * by optional fields such as `_id`, `name`, and `nationality`.
 */
export type PersonQueryFilters = z.infer<typeof PersonQueryFilterSchema>;

/**
 * Type representing the sorting options used when querying Person records.
 *
 * Corresponds to {@link PersonQuerySortSchema}. Specifies sorting directions for
 * fields such as `name` and `nationality`, typically "asc" or "desc".
 */
export type PersonQuerySorts = z.infer<typeof PersonQuerySortSchema>;

/**
 * Type representing combined filter and sort options for Person queries.
 *
 * Corresponds to {@link PersonQueryOptionsSchema}, which merges filtering and sorting
 * criteria into a single object for flexible and expressive query parameters.
 */
export type PersonQueryOptions = z.infer<typeof PersonQueryOptionsSchema>;