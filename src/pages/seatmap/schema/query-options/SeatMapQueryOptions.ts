/**
 * # Seat Map Query Schemas
 *
 * This module provides Zod schemas for filtering and sorting seat map data.
 * These schemas are used when constructing API query parameters, repository
 * query objects, or validating UI-driven filter/sort inputs.
 *
 * ## Included Schemas
 * - **SeatMapFilterSchema** — Validation for filterable fields.
 * - **SeatMapSortSchema** — Validation for sortable fields.
 * - **SeatMapQueryOptionSchema** — Combined schema merging filter + sort.
 *
 * ## Purpose
 * These schemas ensure:
 * - Strong typing and validation of query parameters.
 * - Consistent interpretation of optional fields.
 * - Safe and predictable construction of MongoDB/Mongoose queries.
 */

import {SeatMapReferenceFilterSchema} from "@/pages/seatmap/schema/query-options/SeatMapReferenceParams.ts";
import {SeatMapMatchFilterSchema, SeatMapMatchSortSchema} from "@/pages/seatmap/schema/query-options/SeatMapMatchParams.ts";
import {z} from "zod";

/**
 * ## SeatMapQueryOptionSchema
 *
 * A combined schema merging **filters** and **sorting** options into a single
 * query object. Useful for API endpoints or service functions that accept
 * configurable criteria for retrieving seat map data.
 *
 * @example
 * SeatMapQueryOptionSchema.parse({
 *   movie: "6530a8121e4f09c92f123abc",
 *   seatType: "VIP",
 *   sortByPrice: 1
 * });
 *
 * @returns A Zod schema combining `SeatMapFilterSchema` and `SeatMapSortSchema`.
 */
export const SeatMapQueryOptionSchema =
    SeatMapReferenceFilterSchema
        .merge(SeatMapMatchFilterSchema)
        .merge(SeatMapMatchSortSchema);

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