import {
    ShowingQueryMatchFilterSchema,
    ShowingQueryMatchSortSchema,
    ShowingQueryOptionSchema
} from "@/pages/showings/schema/queries/ShowingQueryOption.schema.ts";
import { z } from "zod";

/**
 * Type representing the **filter criteria** for querying movie showings.
 *
 * Inferred from `ShowingQueryMatchFilterSchema`.
 * All fields are optional, allowing partial filtering.
 *
 * @example
 * ```ts
 * const filters: ShowingQueryMatchFilters = {
 *   movie: "movieId123",
 *   theatre: "theatreId456",
 *   startTime: "2025-10-14",
 *   isActive: true,
 * };
 * ```
 */
export type ShowingQueryMatchFilters = z.infer<typeof ShowingQueryMatchFilterSchema>;

/**
 * Type representing the **sort criteria** for querying movie showings.
 *
 * Inferred from `ShowingQueryMatchSortSchema`.
 * Each field is optional; use `1` for ascending or `-1` for descending order.
 *
 * @example
 * ```ts
 * const sort: ShowingQueryMatchSorts = {
 *   startTime: 1,   // ascending
 *   ticketPrice: -1 // descending
 * };
 * ```
 */
export type ShowingQueryMatchSorts = z.infer<typeof ShowingQueryMatchSortSchema>;

/**
 * Type representing the **combined query options** for movie showings,
 * including both filters and sort orders.
 *
 * Inferred from `ShowingQueryOptionSchema`.
 *
 * @example
 * ```ts
 * const queryOptions: ShowingQueryOptions = {
 *   movie: "movieId123",
 *   startTime: "2025-10-14",
 *   isActive: true,
 *   startTime: 1,  // sort ascending
 * };
 * ```
 */
export type ShowingQueryOptions = z.infer<typeof ShowingQueryOptionSchema>;
