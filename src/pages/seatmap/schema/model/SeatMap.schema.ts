/**
 * @file SeatMap.schema.ts
 *
 * Zod schemas for seat map entities.
 *
 * Defines validation schemas for seat pricing and availability
 * within a specific showing, including:
 * - Base ObjectId-backed schemas
 * - Partially and fully populated variants
 * - Detailed layout-oriented schemas
 * - Array and paginated response helpers
 *
 * These schemas provide both runtime validation and
 * strong type inference for seat map–related data.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {SeatMapStatusEnum} from "@/pages/seatmap/schema/enum/SeatMapStatusEnum.ts";
import {ShowingDetailsSchema, ShowingSchema} from "@/pages/showings/schema/showing/Showing.schema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {SeatDetailsSchema} from "@/pages/seats/schema/seat/SeatDetails.schema.ts";
import {SeatSchema} from "@/pages/seats/schema/seat/Seat.schema.ts";

/**
 * Base SeatMap schema.
 *
 * @remarks
 * Represents pricing and availability metadata for a single seat
 * within a specific showing. All relational fields are expressed
 * as ObjectId references.
 */
export const SeatMapSchema = z.object({
    _id: IDStringSchema,
    seat: IDStringSchema,
    showing: IDStringSchema,
    basePrice: PositiveNumberSchema,
    priceMultiplier: PositiveNumberSchema,
    overridePrice: PositiveNumberSchema.optional(),
    status: SeatMapStatusEnum,
});

/**
 * SeatMap schema with populated seat relation.
 *
 * @remarks
 * Replaces the `seat` ObjectId with the populated seat document.
 * Commonly used when seat metadata is required without showing details.
 */
export const SeatMapWithSeatSchema = SeatMapSchema.extend({
    seat: z.lazy(() => SeatSchema),
});

/**
 * SeatMap schema with fully populated relations.
 *
 * @remarks
 * Extends {@link SeatMapWithSeatSchema} by populating
 * the associated showing document.
 */
export const PopulatedSeatMapSchema = SeatMapWithSeatSchema.extend({
    showing: z.lazy(() => ShowingSchema),
});

/**
 * Detailed SeatMap schema for layout and pricing views.
 *
 * @remarks
 * Intended for seat selection and administrative tooling.
 * Includes positional metadata and a computed final price.
 */
export const SeatMapDetailsSchema = SeatMapSchema.extend({
    seat: z.lazy(() => SeatDetailsSchema),
    showing: z.lazy(() => ShowingDetailsSchema),
    x: PositiveNumberSchema,
    y: PositiveNumberSchema,
    row: NonEmptyStringSchema.max(10, "Must be 10 characters or less."),
    finalPrice: PositiveNumberSchema,
});

// ---------------------
// --- Array Schemas ---
// ---------------------

/** Array schema for basic SeatMap entities. */
export const SeatMapArraySchema =
    generateArraySchema(SeatMapSchema);

/** Array schema for detailed SeatMap entities. */
export const SeatMapDetailsArraySchema =
    generateArraySchema(SeatMapDetailsSchema);

// -------------------------
// --- Paginated Schemas ---
// -------------------------

/**
 * Paginated SeatMap schema.
 *
 * @remarks
 * Intended for API responses returning ObjectId-backed
 * seat map data.
 */
export const PaginatedSeatMapSchema =
    generatePaginationSchema(SeatMapSchema);

/**
 * Paginated detailed SeatMap schema.
 *
 * @remarks
 * Intended for API responses requiring fully populated
 * seat and showing information.
 */
export const PaginatedSeatMapDetailsSchema =
    generatePaginationSchema(SeatMapDetailsSchema);
