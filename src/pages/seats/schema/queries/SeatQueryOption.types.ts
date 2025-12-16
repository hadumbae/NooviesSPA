/**
 * @file SeatQueryOption.types.ts
 * @summary Type definitions for Seat query parameters derived from Zod schemas.
 *
 * @description
 * Provides TypeScript types inferred from Zod schemas for validating
 * and typing seat query parameters, including filters, sorting options,
 * and the combined query object.
 */

import { z } from "zod";
import {
    SeatQueryFiltersSchema,
    SeatQueryOptionsSchema,
    SeatQuerySortsSchema
} from "@/pages/seats/schema/queries/SeatQueryOption.schema.ts";

/**
 * Type representing available filters for querying Seat documents.
 *
 * Derived from {@link SeatQueryFiltersSchema}.
 * Includes optional properties for narrowing query results by seat attributes:
 * - `_id`: seat ID (MongoDB ObjectID string)
 * - `row`: row label (e.g., "A", "B")
 * - `seatNumber`: seat number within the row
 * - `seatType`: classification of the seat (REGULAR, VIP, etc.)
 * - `isAvailable`: availability status of the seat
 * - `priceMultiplier`: price adjustment factor
 * - `theatre`: associated theatre ID
 * - `screen`: associated screen ID
 * - `showing`: associated showing ID
 */
export type SeatQueryFilters = z.infer<typeof SeatQueryFiltersSchema>;

/**
 * Type representing sorting options for querying Seat documents.
 *
 * Derived from {@link SeatQuerySortsSchema}.
 * Each property corresponds to a sortable seat field and accepts a MongoDB sort order:
 * - `1` → ascending
 * - `-1` → descending
 *
 * Sortable fields include:
 * - `sortByTheatre`
 * - `sortByScreen`
 * - `sortByRow`
 * - `sortBySeatNumber`
 * - `sortBySeatType`
 * - `sortByIsAvailable`
 * - `sortByPriceMultiplier`
 */
export type SeatQuerySorts = z.infer<typeof SeatQuerySortsSchema>;

/**
 * Type representing the full set of query options for Seat documents.
 *
 * Derived from {@link SeatQueryOptionsSchema}.
 * Combines both filtering and sorting options:
 * - {@link SeatQueryFilters} → criteria for narrowing query results
 * - {@link SeatQuerySorts} → criteria for ordering results
 */
export type SeatQueryOptions = z.infer<typeof SeatQueryOptionsSchema>;
