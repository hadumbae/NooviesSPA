import { z } from "zod";
import { TheatreSchema } from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import { ScreenSchema } from "@/pages/screens/schema/screen/Screen.schema.ts";
import { SeatBaseSchema } from "@/pages/seats/schema/seat/Seat.schema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { SeatTypeEnum } from "@/pages/seats/schema/SeatTypeEnumSchema.ts";
import { CoercedBooleanValueSchema } from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import { CoercedNumberValueSchema } from "@/common/schema/numbers/number-value/CoercedNumberValueSchema.ts";

/**
 * ## SeatDetailsReferenceSchema
 *
 * Extends the base seat schema by including full references to the theatre and screen.
 * This schema is shared by all layout types (SEAT, AISLE, STAIR).
 *
 * @properties
 * - `theatre` — Nested theatre object validated by TheatreSchema.
 * - `screen` — Nested screen object validated by ScreenSchema.
 */
const SeatDetailsReferenceSchema = SeatBaseSchema.extend({
    theatre: z.lazy(() => TheatreSchema),
    screen: z.lazy(() => ScreenSchema),
});

/**
 * ## SeatingSchema
 *
 * Schema for seating positions (SEAT layout type) with full theatre and screen references.
 * Extends SeatDetailsReferenceSchema and adds seat-specific properties.
 *
 * @properties
 * - `seatNumber` — Numeric identifier within the row (positive number).
 * - `seatLabel` — Optional display label (e.g., "A5", "VIP-1").
 * - `seatType` — Type/category of the seat (e.g., REGULAR, VIP).
 * - `isAvailable` — Boolean indicating booking availability.
 * - `priceMultiplier` — Multiplier applied to the base ticket price (≥ 0).
 */
const SeatingSchema = SeatDetailsReferenceSchema.extend({
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
 * Schema for AISLE layout type with full theatre and screen references.
 * Restricts `layoutType` to "AISLE".
 */
const AisleSchema = SeatDetailsReferenceSchema.extend({
    layoutType: z.literal("AISLE"),
});

/**
 * ## StairSchema
 *
 * Schema for STAIR layout type with full theatre and screen references.
 * Restricts `layoutType` to "STAIR".
 */
const StairSchema = SeatDetailsReferenceSchema.extend({
    layoutType: z.literal("STAIR"),
});

/**
 * ## SeatDetailsSchema
 *
 * Discriminated union schema for fully populated seat details.
 * Differentiates between seating, aisle, and stair layout types based on `layoutType`.
 *
 * @example
 * ```ts
 * // SEAT input with theatre and screen details
 * const seatDetails = SeatDetailsSchema.parse({
 *   _id: "64f1c0c8ab1234567890abcd",
 *   theatre: { _id: "64f1c0c8ab1234567890abce", name: "Main Theatre", location: "Downtown" },
 *   screen: { _id: "64f1c0c8ab1234567890abcf", name: "Screen 1", capacity: 120 },
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
 * const aisleDetails = SeatDetailsSchema.parse({
 *   _id: "64f1c0c8ab1234567890abc1",
 *   theatre: { ... },
 *   screen: { ... },
 *   row: "B",
 *   layoutType: "AISLE",
 *   x: 5,
 *   y: 2,
 * });
 *
 * // STAIR input
 * const stairDetails = SeatDetailsSchema.parse({
 *   _id: "64f1c0c8ab1234567890abc2",
 *   theatre: { ... },
 *   screen: { ... },
 *   row: "C",
 *   layoutType: "STAIR",
 *   x: 10,
 *   y: 3,
 * });
 * ```
 */
export const SeatDetailsSchema = z.discriminatedUnion(
    "layoutType",
    [SeatingSchema, AisleSchema, StairSchema],
);
