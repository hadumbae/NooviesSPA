import { z } from "zod";
import { SeatTypeEnum } from "@/pages/seats/schema/SeatTypeEnumSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    CleanedPositiveNumberSchema,
} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { CoercedBooleanValueSchema } from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import { SeatLayoutTypeEnumSchema } from "@/pages/seats/schema/SeatLayoutTypeEnumSchema.ts";

/**
 * @file SeatFormSchema.ts
 *
 * Defines schemas for **validated seat form submissions**, including seats,
 * aisles, and stairs.
 *
 * This file exports:
 * - `SeatFormBaseSchema`: shared fields used across all layout types
 * - `SeatingSchema`: full schema for actual seats
 * - `AisleSchema` & `StairSchema`: schemas for non-seat layout elements
 * - `SeatFormSchema`: discriminated union combining all layout types
 *
 * The union is discriminated using the `layoutType` field, ensuring that:
 * - Fields such as `seatNumber`, `seatType`, etc. exist only for `"SEAT"`
 * - Aisles and stairs enforce *only* their required structure
 *
 * This schema is intended for:
 * - Server-side validation of submitted form data
 * - API endpoint request validation
 * - Strict form handling where seat vs. aisle vs. stair rules differ
 */

/**
 * Base schema shared by all seat-layout elements.
 *
 * Includes the core geometric and location data that applies to:
 * - Seats
 * - Aisles
 * - Stairs
 */
export const SeatFormBaseSchema = z.object({
    /**
     * Theatre ID to which this layout element belongs.
     */
    theatre: IDStringSchema,

    /**
     * Screen ID within the theatre.
     */
    screen: IDStringSchema,

    /**
     * Row identifier (e.g., "A", "Front", "VIP-Row1").
     * Limited to 10 characters for consistency.
     */
    row: NonEmptyStringSchema.max(10, "Must be 10 characters or less."),

    /**
     * X-coordinate position on the seat map layout.
     */
    x: CleanedPositiveNumberSchema,

    /**
     * Y-coordinate position on the seat map layout.
     */
    y: CleanedPositiveNumberSchema,

    /**
     * Layout type discriminant. Determines which extended schema applies.
     */
    layoutType: SeatLayoutTypeEnumSchema,
});

/**
 * Schema for **actual seats** (as opposed to aisles or stairs).
 *
 * Requires additional fields related to seating, such as:
 * - seat number
 * - seat type
 * - availability
 * - pricing multiplier
 */
const SeatingSchema = SeatFormBaseSchema.extend({
    /** Discriminant indicating the element is a seat. */
    layoutType: z.literal("SEAT"),

    /** Number identifying the seat within its row. */
    seatNumber: CleanedPositiveNumberSchema,

    /**
     * Optional seat label (e.g., "VIP-3", "XL-Legroom").
     * Empty string is converted to `undefined` to standardize optionality.
     */
    seatLabel: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(50, {
            message: "Must be 50 characters or less.",
        }).optional(),
    ).optional(),

    /** Type of seat (e.g., regular, premium, VIP). */
    seatType: SeatTypeEnum,

    /** Whether the seat is available for booking. */
    isAvailable: CoercedBooleanValueSchema,

    /**
     * Price multiplier applied on top of the base screen price.
     * For example: 1 = normal, 1.5 = premium.
     */
    priceMultiplier: CleanedPositiveNumberSchema,
});

/**
 * Schema for **aisle blocks** within the seating layout.
 *
 * These represent empty floor space rather than seatable positions.
 */
const AisleSchema = SeatFormBaseSchema.extend({
    /** Discriminant indicating an aisle. */
    layoutType: z.literal("AISLE"),
});

/**
 * Schema for **stairs** within the seating layout.
 *
 * Represents elevation steps or transitions in the seating map.
 */
const StairSchema = SeatFormBaseSchema.extend({
    /** Discriminant indicating a stair. */
    layoutType: z.literal("STAIR"),
});

/**
 * Discriminated union schema representing **any valid seat-layout form**.
 *
 * Uses the `layoutType` field as the discriminant, automatically selecting
 * the correct subtype:
 *
 * - `"SEAT"` → {@link SeatingSchema}
 * - `"AISLE"` → {@link AisleSchema}
 * - `"STAIR"` → {@link StairSchema}
 *
 * @example
 * ```ts
 * const result = SeatFormSchema.parse({
 *   theatre: "656a...",
 *   screen: "99bb...",
 *   row: "C",
 *   x: 12,
 *   y: 5,
 *   layoutType: "SEAT",
 *   seatNumber: 14,
 *   seatType: "REGULAR",
 *   isAvailable: true,
 *   priceMultiplier: 1,
 * });
 * ```
 */
export const SeatFormSchema = z.discriminatedUnion("layoutType", [
    SeatingSchema,
    AisleSchema,
    StairSchema,
]);
