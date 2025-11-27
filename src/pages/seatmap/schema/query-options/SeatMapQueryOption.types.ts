/**
 * # Seat Map Query Option Types
 *
 * This module provides TypeScript type aliases inferred from the Zod schemas
 * used to validate seat map filtering and sorting options. These inferred types
 * are used across services, repositories, and controllers to ensure strict and
 * predictable typing of query parameters.
 *
 * ## Exports
 * - **SeatMapFilters** — Strongly typed representation of available filter fields.
 * - **SeatMapSorts** — Strongly typed representation of available sorting fields.
 * - **SeatMapQueryOptions** — Full merged type combining both filters and sorts.
 */

import {z} from "zod";
import {
    SeatMapFilterSchema,
    SeatMapQueryOptionSchema,
    SeatMapSortSchema
} from "@/pages/seatmap/schema/query-options/SeatMapQueryOption.schema.ts";

/**
 * ## SeatMapFilters
 *
 * Inferred TypeScript type representing all valid seat map filter fields as
 * defined by `SeatMapFilterSchema`.
 * All fields are optional, and may be used to construct database query objects,
 * API query parameters, or UI filter states.
 *
 * @example
 * const filters: SeatMapFilters = {
 *   movie: "6530a8121e4f09c92f123abc",
 *   seatRow: "C",
 *   status: "AVAILABLE",
 * };
 */
export type SeatMapFilters = z.infer<typeof SeatMapFilterSchema>;

/**
 * ## SeatMapSorts
 *
 * Inferred TypeScript type representing all sorting options for seat map queries.
 * Derived from `SeatMapSortSchema`.
 * Typical values are `1` (ascending) or `-1` (descending).
 *
 * @example
 * const sorts: SeatMapSorts = {
 *   sortByPrice: 1,
 *   sortBySeatNumber: -1,
 * };
 */
export type SeatMapSorts = z.infer<typeof SeatMapSortSchema>;

/**
 * ## SeatMapQueryOptions
 *
 * A combined, fully typed structure including both filter and sort fields.
 * Derived from `SeatMapQueryOptionSchema`, which merges the two schemas.
 *
 * Useful for repository methods or controller handlers that accept mixed
 * filtering and sorting parameters.
 *
 * @example
 * const query: SeatMapQueryOptions = {
 *   movie: "6530a8121e4f09c92f123abc",
 *   seatType: "VIP",
 *   sortByPrice: 1,
 * };
 */
export type SeatMapQueryOptions = z.infer<typeof SeatMapQueryOptionSchema>;
