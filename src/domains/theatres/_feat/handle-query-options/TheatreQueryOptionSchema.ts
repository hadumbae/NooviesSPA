/**
 * @fileoverview Zod schema and type definition for theatre query options.
 */

import {z} from "zod";
import {
    TheatreQueryMatchFilterSchema
} from "@/domains/theatres/_feat/handle-query-options/TheatreQueryMatchFilterSchema.ts";
import {
    TheatreQueryMatchSortSchema
} from "@/domains/theatres/_feat/handle-query-options/TheatreQueryMatchSortSchema.ts";

/**
 * Zod schema defining query options for theatre data.
 */
export const TheatreQueryOptionSchema = TheatreQueryMatchFilterSchema.merge(TheatreQueryMatchSortSchema);

/**
 * Inferred type for validated theatre query options.
 */
export type TheatreQueryOptions = z.infer<typeof TheatreQueryOptionSchema>;