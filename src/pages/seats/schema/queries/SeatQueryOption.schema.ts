/**
 * @file SeatQuerySchemas.ts
 *
 * @summary
 * Zod schemas for querying seats, including filtering and sorting options.
 *
 * @description
 * These schemas validate query parameters for fetching seat data.
 * - `SeatQueryFiltersSchema` supports filtering by seat attributes.
 * - `SeatQuerySortsSchema` supports sorting by seat attributes.
 * - `SeatQueryOptionsSchema` combines filters and sorts for a single query object.
 */

import { z } from "zod";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { SeatTypeEnum } from "@/pages/seats/schema/SeatTypeEnumSchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { MongooseSortOrderSchema } from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import { CoercedBooleanValueSchema } from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import { SeatLayoutTypeEnumSchema } from "@/pages/seats/schema/SeatLayoutTypeEnumSchema.ts";

/**
 * @summary Zod schema for filtering seats in queries.
 *
 * @description
 * Supports optional filters for seat identity, row, number, type, availability,
 * pricing, layout type, and associated theatre or screen.
 *
 * @example
 * ```ts
 * const filters = SeatQueryFiltersSchema.parse({
 *   row: "A",
 *   seatType: "VIP",
 *   isAvailable: true,
 * });
 * ```
 */
export const SeatQueryFiltersSchema = z.object({
    /** Unique identifier for the seat (MongoDB ObjectID string). */
    _id: IDStringSchema.optional(),

    /** Row label of the seat (non-empty string). */
    row: NonEmptyStringSchema.optional(),

    /** Seat number within the row (non-empty string). */
    seatNumber: NonEmptyStringSchema.optional(),

    /** Seat type (e.g., REGULAR, VIP, RECLINER). */
    seatType: SeatTypeEnum.optional(),

    /** Seat layout type (e.g., SEAT, NON-SEAT). */
    layoutType: SeatLayoutTypeEnumSchema.optional(),

    /** Whether the seat is currently available for booking. */
    isAvailable: CoercedBooleanValueSchema.optional(),

    /** Price multiplier applied to the seat (must be positive). */
    priceMultiplier: PositiveNumberSchema.optional(),

    /** Theatre ID to which the seat belongs. */
    theatre: IDStringSchema.optional(),

    /** Screen ID to which the seat belongs. */
    screen: IDStringSchema.optional(),
});

/**
 * @summary Zod schema for sorting seat queries.
 *
 * @description
 * Each field accepts a MongoDB sort order (`1` for ascending, `-1` for descending).
 *
 * @example
 * ```ts
 * const sorts = SeatQuerySortsSchema.parse({
 *   sortByRow: 1,
 *   sortBySeatNumber: -1,
 * });
 * ```
 */
export const SeatQuerySortsSchema = z.object({
    /** Sort by theatre association. */
    sortByTheatre: MongooseSortOrderSchema.optional(),

    /** Sort by screen association. */
    sortByScreen: MongooseSortOrderSchema.optional(),

    /** Sort by seat row. */
    sortByRow: MongooseSortOrderSchema.optional(),

    /** Sort by seat number. */
    sortBySeatNumber: MongooseSortOrderSchema.optional(),

    /** Sort by seat type. */
    sortBySeatType: MongooseSortOrderSchema.optional(),

    /** Sort by availability (available vs unavailable). */
    sortByIsAvailable: MongooseSortOrderSchema.optional(),

    /** Sort by price multiplier. */
    sortByPriceMultiplier: MongooseSortOrderSchema.optional(),
});

/**
 * @summary Combined Zod schema for seat query options.
 *
 * @description
 * Merges {@link SeatQueryFiltersSchema} and {@link SeatQuerySortsSchema} into a single
 * schema that can be used to validate all seat query parameters at once.
 *
 * @example
 * ```ts
 * const queryOptions = SeatQueryOptionsSchema.parse({
 *   row: "B",
 *   isAvailable: true,
 *   sortBySeatNumber: 1,
 * });
 * ```
 */
export const SeatQueryOptionsSchema = SeatQueryFiltersSchema.merge(SeatQuerySortsSchema);
