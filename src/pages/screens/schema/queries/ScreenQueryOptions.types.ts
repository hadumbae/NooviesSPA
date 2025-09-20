import { z } from "zod";
import {
    ScreenQueryFiltersSchema,
    ScreenQueryOptionsSchema,
    ScreenQueryParamsSchema,
    ScreenQuerySortsSchema
} from "@/pages/screens/schema/queries/ScreenQueryOptions.schema.ts";

/**
 * Type representing the filterable fields for querying screens.
 *
 * Derived from {@link ScreenQueryFiltersSchema}.
 * Optional fields include:
 * - `_id`: Screen ID
 * - `name`: Screen name
 * - `theatre`: Associated theatre ID
 * - `capacity`: Screen capacity
 * - `screenType`: Screen type
 */
export type ScreenQueryFilters = z.infer<typeof ScreenQueryFiltersSchema>;

/**
 * Type representing the sortable fields for querying screens.
 *
 * Derived from {@link ScreenQuerySortsSchema}.
 * Each field is optional and accepts a MongoDB sort order (`1` for ascending, `-1` for descending):
 * - `name`
 * - `capacity`
 * - `screenType`
 * - `createdAt`
 */
export type ScreenQuerySorts = z.infer<typeof ScreenQuerySortsSchema>;

/**
 * Type representing additional query parameters for screens.
 *
 * Derived from {@link ScreenQueryParamsSchema}.
 * Optional fields include:
 * - `showingsPerScreen`: Number of showings to fetch per screen
 */
export type ScreenQueryParams = z.infer<typeof ScreenQueryParamsSchema>;

/**
 * Type representing the complete set of screen query options.
 *
 * Derived from {@link ScreenQueryOptionsSchema}, which merges:
 * - Filters ({@link ScreenQueryFilters})
 * - Sorts ({@link ScreenQuerySorts})
 * - Additional parameters ({@link ScreenQueryParams})
 */
export type ScreenQueryOptions = z.infer<typeof ScreenQueryOptionsSchema>;
