/**
 * @fileoverview Zod schema and type for combined movie query filtering and sorting options.
 */

import {z} from 'zod';
import {MovieQueryFilterSchema} from "@/domains/movies/_schema/queries/MovieQueryFilterSchema";
import {MovieQuerySortSchema} from "@/domains/movies/_schema/queries/MovieQuerySortSchema";

/** Zod schema merging movie filter and sort parameters for query validation. */
export const MovieQueryOptionSchema = MovieQuerySortSchema.merge(MovieQueryFilterSchema);

/** Type representing combined movie query filters and sorting. */
export type MovieQueryOptions = z.infer<typeof MovieQueryOptionSchema>;