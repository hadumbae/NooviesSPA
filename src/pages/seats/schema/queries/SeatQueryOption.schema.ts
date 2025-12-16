/**
 * @file SeatQuerySchemas.ts
 * @summary Zod schemas for validating query parameters when fetching Seat documents.
 *
 * @description
 * These schemas standardize the validation of query parameters for Seat-related API endpoints.
 * They cover filtering, sorting, and combined query options:
 * - `SeatQueryFiltersSchema` validates optional filters on seat attributes.
 * - `SeatQuerySortsSchema` validates optional sorting parameters for Mongoose queries.
 * - `SeatQueryOptionsSchema` merges filters and sorts for a complete, validated query object.
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
 * Zod schema for filtering Seat documents in queries.
 *
 * All fields are optional and correspond to filterable Seat properties.
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

    /** Type of seat (e.g., REGULAR, VIP, RECLINER). */
    seatType: SeatTypeEnum.optional(),

    /** Seat layout type (e.g., SEAT, NON-SEAT). */
    layoutType: SeatLayoutTypeEnumSchema.optional(),

    /** Whether the seat is available for booking. */
    isAvailable: CoercedBooleanValueSchema.optional(),

    /** Price multiplier applied to the seat (positive number). */
    priceMultiplier: PositiveNumberSchema.optional(),

    /** ID of the theatre the seat belongs to. */
    theatre: IDStringSchema.optional(),

    /** ID of the screen the seat belongs to. */
    screen: IDStringSchema.optional(),

    /** ID of the showing associated with the seat. */
    showing: IDStringSchema.optional(),
});

/**
 * Zod schema for sorting Seat queries.
 *
 * Each field corresponds to a sortable property in Mongoose `$sort`.
 * Accepts `1` for ascending and `-1` for descending.
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
    sortByTheatre: MongooseSortOrderSchema.optional(),
    sortByScreen: MongooseSortOrderSchema.optional(),
    sortByRow: MongooseSortOrderSchema.optional(),
    sortBySeatNumber: MongooseSortOrderSchema.optional(),
    sortBySeatType: MongooseSortOrderSchema.optional(),
    sortByIsAvailable: MongooseSortOrderSchema.optional(),
    sortByPriceMultiplier: MongooseSortOrderSchema.optional(),
});

/**
 * Combined Zod schema for all Seat query options.
 *
 * Merges {@link SeatQueryFiltersSchema} and {@link SeatQuerySortsSchema} into a single schema
 * for complete validation of filtering and sorting parameters.
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
