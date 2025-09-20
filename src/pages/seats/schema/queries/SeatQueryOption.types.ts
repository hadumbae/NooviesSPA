import {z} from "zod";
import {
    SeatQueryFiltersSchema,
    SeatQueryOptionsSchema,
    SeatQuerySortsSchema
} from "@/pages/seats/schema/queries/SeatQueryOption.schema.ts";

/**
 * Type representing available filters for querying seats.
 *
 * Derived from {@link SeatQueryFiltersSchema}.
 *
 * Includes optional filters such as:
 * - `_id` (seat ID)
 * - `row` (row label)
 * - `seatNumber` (seat number)
 * - `seatType` (seat classification)
 * - `isAvailable` (availability status)
 * - `priceMultiplier` (pricing adjustment factor)
 * - `theatre` (theatre ID)
 * - `screen` (screen ID)
 */
export type SeatQueryFilters = z.infer<typeof SeatQueryFiltersSchema>;

/**
 * Type representing available sorting options for querying seats.
 *
 * Derived from {@link SeatQuerySortsSchema}.
 *
 * Each property corresponds to a seat field
 * and can be assigned a MongoDB sort order:
 * - `1` → ascending
 * - `-1` → descending
 */
export type SeatQuerySorts = z.infer<typeof SeatQuerySortsSchema>;

/**
 * Type representing the full set of query options for seats.
 *
 * Derived from {@link SeatQueryOptionsSchema}.
 *
 * Combines both:
 * - {@link SeatQueryFilters} → filters for narrowing down seat results
 * - {@link SeatQuerySorts} → sorting options for ordered results
 */
export type SeatQueryOptions = z.infer<typeof SeatQueryOptionsSchema>;
