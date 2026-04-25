/**
 * @fileoverview Aggregated Zod schema for Theatre Screen search and retrieval options.
 * Combines pagination, filtering, and sorting into a unified interface for API queries.
 */

import {z} from "zod";
import {
    TheatreScreenQueryMatchFiltersSchema
} from "@/domains/theatre-screens/schema/queries/TheatreScreenQueryMatchFiltersSchema.ts";
import {
    TheatreScreenQueryMatchSortsSchema
} from "@/domains/theatre-screens/schema/queries/TheatreScreenQueryMatchSortsSchema.ts";

/**
 * Combined schema for all screen query options.
 */
export const TheatreScreenQueryOptionsSchema = TheatreScreenQueryMatchFiltersSchema.merge(TheatreScreenQueryMatchSortsSchema);

/**
 * Type representing the complete set of screen query options.
 */
export type TheatreScreenQueryOptions = z.infer<typeof TheatreScreenQueryOptionsSchema>;