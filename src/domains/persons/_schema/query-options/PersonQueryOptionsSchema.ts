/**
 * @fileoverview Defines the combined schema for person query filtering and sorting options.
 */

import {z} from "zod";
import {PersonQuerySortSchema} from "@/domains/persons/_schema/query-options/PersonQuerySortSchema.ts";
import {PersonQueryFilterSchema} from "@/domains/persons/_schema/query-options/PersonQueryFilterSchema.ts";

/** Zod schema merging filter and sort parameters for person queries. */
export const PersonQueryOptionsSchema = PersonQuerySortSchema.merge(PersonQueryFilterSchema);

/** Type for combined person query filter and sort options. */
export type PersonQueryOptions = z.infer<typeof PersonQueryOptionsSchema>;