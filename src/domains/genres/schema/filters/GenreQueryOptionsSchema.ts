/**
 * @fileoverview Zod schemas for validating genre query parameters including filtering and sorting options.
 */

import {z} from "zod";
import {GenreQueryFilterSchema} from "@/domains/genres/schema/filters/GenreQueryFilterSchema";
import {GenreQuerySortSchema} from "@/domains/genres/schema/filters/GenreQuerySortSchema";

/** Combined schema including both filter and sorting options for genre queries. */
export const GenreQueryOptionSchema = GenreQueryFilterSchema.merge(GenreQuerySortSchema);

/** Combined type representing all valid query parameters for genres. */
export type GenreQueryOptions = z.infer<typeof GenreQueryOptionSchema>;