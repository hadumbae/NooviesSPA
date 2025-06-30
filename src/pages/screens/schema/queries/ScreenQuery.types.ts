import {z} from "zod";
import {
    ScreenQueryFilterSchema,
    ScreenQueryMatchFiltersSchema,
    ScreenQueryOptionsSchema,
    ScreenQuerySortsSchema
} from "@/pages/screens/schema/queries/ScreenQuery.schema.ts";

/**
 * Type for screen query options (e.g. showingsPerScreen).
 */
export type ScreenQueryOptions = z.infer<typeof ScreenQueryOptionsSchema>;

/**
 * Type for screen match filters (e.g. name, capacity, screenType, theatre).
 */
export type ScreenQueryMatchFilters = z.infer<typeof ScreenQueryMatchFiltersSchema>;

/**
 * Combined type for all screen filters and options.
 */
export type ScreenQueryFilters = z.infer<typeof ScreenQueryFilterSchema>;

/**
 * Type for allowed screen sorting parameters.
 */
export type ScreenQuerySorts = z.infer<typeof ScreenQuerySortsSchema>;