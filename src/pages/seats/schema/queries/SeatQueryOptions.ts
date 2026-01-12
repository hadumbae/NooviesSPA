/**
 * @file SeatQuerySchemas.ts
 *
 * Unified Zod schema for validating Seat query parameters.
 *
 * Combines:
 * - {@link SeatQueryFiltersSchema} — match-level Seat field filters
 * - {@link SeatQuerySortsSchema} — match-level sort options
 *
 * Intended for repository and controller-level query validation.
 */

import { z } from "zod";
import { SeatQuerySortsSchema } from "@/pages/seats/schema/queries/SeatQueryMatchSorts.ts";
import { SeatQueryFiltersSchema } from "@/pages/seats/schema/queries/SeatQueryMatchFilters.ts";

/**
 * Combined Zod schema for Seat query options.
 *
 * Merges filtering and sorting concerns into a single validated object.
 *
 * @example
 * ```ts
 * SeatQueryOptionsSchema.parse({
 *   row: "C",
 *   isAvailable: true,
 *   sortBySeatNumber: 1,
 * });
 * ```
 */
export const SeatQueryOptionsSchema =
    SeatQueryFiltersSchema.merge(SeatQuerySortsSchema);

/**
 * Inferred TypeScript type for complete Seat query options.
 *
 * @remarks
 * Suitable for use in repositories, query builders, and API handlers.
 */
export type SeatQueryOptions = z.infer<typeof SeatQueryOptionsSchema>;
