/**
 * @fileoverview Unified Zod schema for validating comprehensive Seat query parameters, merging filters and sorts.
 */

import { z } from "zod";
import { SeatQuerySortsSchema } from "@/domains/seats/_feat/handle-query-options/SeatQueryMatchSorts.ts";
import { SeatQueryFiltersSchema } from "@/domains/seats/_feat/handle-query-options/SeatQueryMatchFilters.ts";

/**
 * Combined Zod schema merging match-level filters and sort options for Seat entities.
 */
export const SeatQueryOptionsSchema =
    SeatQueryFiltersSchema.merge(SeatQuerySortsSchema);

/**
 * TypeScript type inferred from {@link SeatQueryOptionsSchema}.
 */
export type SeatQueryOptions = z.infer<typeof SeatQueryOptionsSchema>;