import { z } from "zod";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { SeatMapStatusEnum } from "@/pages/seatmap/schema/enum/SeatMapStatusEnum.ts";
import { ShowingDetailsSchema, ShowingSchema } from "@/pages/showings/schema/showing/Showing.schema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import { generatePaginationSchema } from "@/common/utility/schemas/generatePaginationSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { SeatDetailsSchema } from "@/pages/seats/schema/seat/SeatDetails.schema.ts";
import { SeatSchema } from "@/pages/seats/schema/seat/Seat.schema.ts";

/**
 * @file SeatMap.schema.ts
 *
 * @summary
 * Zod schemas for seat map entities.
 *
 * @description
 * Defines validation schemas for seat pricing and availability within
 * a specific showing, including:
 * - Base schemas using ObjectId references
 * - Fully populated variants for detailed views
 * - Array and paginated schemas for API responses
 *
 * These schemas provide both runtime validation and strong type inference
 * for seat map–related data across the application.
 */

/**
 * Base schema for a SeatMap entity.
 *
 * @remarks
 * Represents pricing and availability information for a single seat
 * within a specific showing. Relational fields are stored as ObjectId
 * references.
 *
 * @property _id - Unique identifier of the seat map entry.
 * @property seat - Reference to the seat.
 * @property showing - Reference to the showing.
 * @property basePrice - Base ticket price for the seat.
 * @property priceMultiplier - Multiplier applied to the base price.
 * @property overridePrice - Optional override price for the seat.
 * @property status - Current availability/status of the seat.
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
 * SeatMap schema with populated relations.
 *
 * @remarks
 * Extends {@link SeatMapSchema} by replacing ObjectId references with
 * their corresponding populated documents.
 *
 * @property seat - Populated seat document.
 * @property showing - Populated showing document.
 */
export const PopulatedSeatMapSchema = SeatMapSchema.extend({
    seat: z.lazy(() => SeatSchema),
    showing: z.lazy(() => ShowingSchema),
});

/**
 * Detailed SeatMap schema.
 *
 * @remarks
 * Extends {@link SeatMapSchema} by:
 * - Replacing ObjectId references with detailed seat and showing objects
 * - Adding positional metadata used for layout rendering
 * - Including a computed final price for the seat
 *
 * @property seat - Populated seat details.
 * @property showing - Populated showing details.
 * @property x - Horizontal position in the seat layout.
 * @property y - Vertical position in the seat layout.
 * @property row - Logical row identifier (e.g. "A", "B").
 * @property finalPrice - Computed final price after adjustments.
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

/**
 * Array schema for basic SeatMap entities.
 */
export const SeatMapArraySchema = generateArraySchema(SeatMapSchema);

/**
 * Array schema for detailed SeatMap entities.
 */
export const SeatMapDetailsArraySchema = generateArraySchema(SeatMapDetailsSchema);

// -------------------------
// --- Paginated Schemas ---
// -------------------------

/**
 * Paginated schema for SeatMap results.
 *
 * @remarks
 * Intended for API responses returning seat map data
 * with ObjectId-based relations.
 */
export const PaginatedSeatMapSchema = generatePaginationSchema(SeatMapSchema);

/**
 * Paginated schema for detailed SeatMap results.
 *
 * @remarks
 * Intended for API responses requiring fully populated
 * seat and showing information.
 */
export const PaginatedSeatMapDetailsSchema =
    generatePaginationSchema(SeatMapDetailsSchema);
