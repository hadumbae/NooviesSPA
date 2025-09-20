import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {SeatTypeEnum} from "@/pages/seats/schema/SeatType.enum.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";

/**
 * Zod schema for filtering seats in queries.
 *
 * Supports filtering by seat identity, row, number, type, availability,
 * pricing, and associated theatre or screen.
 */
export const SeatQueryFiltersSchema = z.object({
    /** Unique identifier for the seat (MongoDB ObjectID string). */
    _id: IDStringSchema.optional(),

    /** Row label of the seat (non-empty string). */
    row: NonEmptyStringSchema.optional(),

    /** Seat number within the row (non-empty string). */
    seatNumber: NonEmptyStringSchema.optional(),

    /** Seat type (e.g., regular, VIP, recliner). */
    seatType: SeatTypeEnum.optional(),

    /** Whether the seat is currently available for booking. */
    isAvailable: RequiredBoolean.optional(),

    /** Price multiplier applied to the seat (must be a positive number). */
    priceMultiplier: PositiveNumberSchema.optional(),

    /** The theatre ID to which the seat belongs. */
    theatre: IDStringSchema.optional(),

    /** The screen ID to which the seat belongs. */
    screen: IDStringSchema.optional(),
});

/**
 * Zod schema for sorting seat queries.
 *
 * Each field accepts a MongoDB sort order (`1` for ascending, `-1` for descending).
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
 * Combined schema for seat query options.
 *
 * Merges filtering and sorting into a single schema
 * that can be used for validating seat query parameters.
 */
export const SeatQueryOptionsSchema = SeatQueryFiltersSchema.merge(SeatQuerySortsSchema);
