import { z } from "zod";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { SeatTypeEnum } from "@/pages/seats/schema/SeatTypeEnumSchema.ts";
import { CoercedNumberValueSchema } from "@/common/schema/numbers/number-value/CoercedNumberValueSchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { CoercedBooleanValueSchema } from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import { SeatLayoutTypeEnumSchema } from "@/pages/seats/schema/SeatLayoutTypeEnumSchema.ts";

/**
 * ## SeatBaseSchema
 *
 * Base Zod schema for all seat entries.
 * Contains common properties for seating and non-seating layout types.
 *
 * @properties
 * - `_id` — Readonly ObjectId string identifying the seat.
 * - `row` — Row identifier (max 10 characters).
 * - `x` — X-coordinate in the layout grid (positive number).
 * - `y` — Y-coordinate in the layout grid (positive number).
 * - `layoutType` — Layout classification (SEAT, AISLE, STAIR).
 */
export const SeatBaseSchema = z.object({
    _id: IDStringSchema.readonly(),
    row: NonEmptyStringSchema.max(10, "Must be 10 characters or less."),
    x: PositiveNumberSchema,
    y: PositiveNumberSchema,
    layoutType: SeatLayoutTypeEnumSchema,
});

/**
 * ## SeatReferenceSchema
 *
 * Extends SeatBaseSchema by including references to the theatre and screen.
 * Shared by all layout types.
 *
 * @properties
 * - `theatre` — ObjectId string referencing the theatre.
 * - `screen` — ObjectId string referencing the screen.
 */
const SeatReferenceSchema = SeatBaseSchema.extend({
    theatre: IDStringSchema,
    screen: IDStringSchema,
});

/**
 * ## SeatingSchema
 *
 * Schema for standard seating positions (SEAT layout type).
 * Extends SeatReferenceSchema with additional seat-specific properties.
 *
 * @properties
 * - `seatNumber` — Numeric identifier within the row (positive number).
 * - `seatLabel` — Optional display label (e.g., "A5", "VIP-1").
 * - `seatType` — Type/category of the seat (e.g., REGULAR, VIP).
 * - `isAvailable` — Boolean indicating booking availability.
 * - `priceMultiplier` — Multiplier applied to the base ticket price (≥ 0).
 */
const SeatingSchema = SeatReferenceSchema.extend({
    layoutType: z.literal("SEAT"),
    seatNumber: PositiveNumberSchema,
    seatLabel: NonEmptyStringSchema.optional(),
    seatType: SeatTypeEnum,
    isAvailable: CoercedBooleanValueSchema,
    priceMultiplier: CoercedNumberValueSchema.gte(0, "Must be 0 or greater."),
});

/**
 * ## AisleSchema
 *
 * Schema for AISLE layout type.
 * Extends SeatReferenceSchema and restricts `layoutType` to "AISLE".
 */
const AisleSchema = SeatReferenceSchema.extend({
    layoutType: z.literal("AISLE"),
});

/**
 * ## StairSchema
 *
 * Schema for STAIR layout type.
 * Extends SeatReferenceSchema and restricts `layoutType` to "STAIR".
 */
const StairSchema = SeatReferenceSchema.extend({
    layoutType: z.literal("STAIR"),
});

/**
 * ## SeatSchema
 *
 * Discriminated union schema for all seat inputs.
 * Differentiates between seating, aisle, and stair layout types
 * based on the `layoutType` property.
 *
 * @example
 * ```ts
 * // SEAT input
 * const seat = SeatSchema.parse({
 *   _id: "64f1c0c8ab1234567890abcd",
 *   theatre: "64f1c0c8ab1234567890abce",
 *   screen: "64f1c0c8ab1234567890abcf",
 *   row: "A",
 *   seatNumber: 1,
 *   seatType: "VIP",
 *   layoutType: "SEAT",
 *   x: 1,
 *   y: 1,
 *   seatLabel: "VIP-1",
 *   isAvailable: true,
 *   priceMultiplier: 1.5,
 * });
 *
 * // AISLE input
 * const aisle = SeatSchema.parse({
 *   _id: "64f1c0c8ab1234567890abc1",
 *   theatre: "64f1c0c8ab1234567890abce",
 *   screen: "64f1c0c8ab1234567890abcf",
 *   row: "B",
 *   layoutType: "AISLE",
 *   x: 5,
 *   y: 2,
 * });
 *
 * // STAIR input
 * const stair = SeatSchema.parse({
 *   _id: "64f1c0c8ab1234567890abc2",
 *   theatre: "64f1c0c8ab1234567890abce",
 *   screen: "64f1c0c8ab1234567890abcf",
 *   row: "C",
 *   layoutType: "STAIR",
 *   x: 10,
 *   y: 3,
 * });
 * ```
 */
export const SeatSchema = z.discriminatedUnion(
    "layoutType",
    [SeatingSchema, AisleSchema, StairSchema],
);
