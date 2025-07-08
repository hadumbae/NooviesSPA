import {z} from "zod";
import {SeatTypeEnum} from "@/pages/seats/schema/SeatType.enum.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {CleanedNonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Base schema for a seat form.
 *
 * Fields:
 * - `theatre`: ID string of the theatre (validated by `IDStringSchema`)
 * - `screen`: ID string of the screen (validated by `IDStringSchema`)
 * - `row`: Non-empty string (max 10 characters) representing the row
 * - `seatType`: Enum value representing the type of seat
 * - `isAvailable`: Required boolean indicating availability
 * - `priceMultiplier`: Non-negative number (≥ 0) that adjusts the base price
 * - `y`: Optional positive number (likely used as a Y coordinate)
 */
export const SeatFormBaseSchema = z.object({
    theatre: IDStringSchema,
    screen: IDStringSchema,
    row: NonEmptyStringSchema.max(10, "Must be 10 characters or less."),
    seatType: SeatTypeEnum,
    isAvailable: RequiredBoolean,
    priceMultiplier: CleanedNonNegativeNumberSchema,
    y: CleanedPositiveNumberSchema.optional(),
});

/**
 * Extended seat form schema.
 *
 * Inherits all fields from `SeatFormBaseSchema` and adds:
 * - `seatNumber`: Positive number (required)
 * - `seatLabel`: Optional non-empty string label
 * - `x`: Optional positive number (likely used as an X coordinate)
 *
 * This schema is suited for validating a **complete seat definition**.
 */
export const SeatFormSchema = SeatFormBaseSchema.extend({
    seatNumber: CleanedPositiveNumberSchema,
    seatLabel: NonEmptyStringSchema.optional(),
    x: CleanedPositiveNumberSchema.optional(),
});

/**
 * Seat-by-row form schema.
 *
 * Inherits all fields from `SeatFormBaseSchema` and adds:
 * - `numberOfSeats`: Positive number of seats in the row
 *
 * This schema is suited for defining a **row of seats**, rather than individual seats.
 */
export const SeatsByRowFormSchema = SeatFormBaseSchema.extend({
    numberOfSeats: CleanedPositiveNumberSchema,
});
