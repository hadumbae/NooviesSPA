import { z } from "zod";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { SeatTypeEnum } from "@/pages/seats/schema/SeatTypeEnumSchema.ts";
import { CoercedNumberValueSchema } from "@/common/schema/numbers/number-value/CoercedNumberValueSchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { CoercedBooleanValueSchema } from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import { SeatLayoutTypeEnumSchema } from "@/pages/seats/schema/SeatLayoutTypeEnumSchema.ts";

/**
 * @file Seat.schema.ts
 *
 * Zod schemas for validating **seat layout** data.
 *
 * Supports seating, aisles, and stairs using a discriminated union.
 */
export const SeatBaseSchema = z.object({
    /** MongoDB ObjectId (readonly). */
    _id: IDStringSchema.readonly(),

    /** Row identifier (≤ 10 characters). */
    row: NonEmptyStringSchema.max(10, "Must be 10 characters or less."),

    /** X-coordinate in the layout grid. */
    x: PositiveNumberSchema,

    /** Y-coordinate in the layout grid. */
    y: PositiveNumberSchema,

    /** Layout classification (SEAT, AISLE, STAIR). */
    layoutType: SeatLayoutTypeEnumSchema,

    /** URL-safe unique identifier (readonly). */
    slug: NonEmptyStringSchema.readonly(),
});

/**
 * Shared references for all seat layout types.
 */
const SeatReferenceSchema = SeatBaseSchema.extend({
    /** Owning theatre reference. */
    theatre: IDStringSchema,

    /** Owning screen reference. */
    screen: IDStringSchema,
});

/**
 * Schema for actual bookable seats.
 */
const SeatingSchema = SeatReferenceSchema.extend({
    layoutType: z.literal("SEAT"),

    /** Seat number within the row. */
    seatNumber: PositiveNumberSchema,

    /** Optional display label (e.g., "A5", "VIP-1"). */
    seatLabel: NonEmptyStringSchema.optional(),

    /** Seat category/type. */
    seatType: SeatTypeEnum,

    /** Booking availability flag. */
    isAvailable: CoercedBooleanValueSchema,

    /** Price multiplier applied to base ticket price (≥ 0). */
    priceMultiplier: CoercedNumberValueSchema.gte(
        0,
        "Must be 0 or greater.",
    ),
});

/** Schema for aisle layout positions. */
const AisleSchema = SeatReferenceSchema.extend({
    layoutType: z.literal("AISLE"),
});

/** Schema for stair layout positions. */
const StairSchema = SeatReferenceSchema.extend({
    layoutType: z.literal("STAIR"),
});

/**
 * 🎟 Discriminated union for all seat layout entries.
 *
 * Differentiates schemas based on `layoutType`.
 */
export const SeatSchema = z.discriminatedUnion(
    "layoutType",
    [SeatingSchema, AisleSchema, StairSchema],
);
