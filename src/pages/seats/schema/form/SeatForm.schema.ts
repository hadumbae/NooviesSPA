import {z} from "zod";
import {SeatTypeEnum} from "@/pages/seats/schema/SeatType.enum.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";
import {SeatForm} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";

/**
 * Schema for initial seat form values.
 *
 * - All fields use `FormStarterValueSchema` to allow empty or placeholder values
 *   when initializing forms.
 * - Suitable for form default values or "starter" forms before final validation.
 */
export const SeatFormValuesSchema = z.object({
    /** Theatre ID (starter value, may be empty) */
    theatre: FormStarterValueSchema,
    /** Screen ID (starter value, may be empty) */
    screen: FormStarterValueSchema,
    /** Row identifier (starter value, may be empty) */
    row: FormStarterValueSchema,
    /** Seat number (starter value, may be empty) */
    seatNumber: FormStarterValueSchema,
    /** Seat label (starter value, may be empty) */
    seatLabel: FormStarterValueSchema,
    /** Seat type (starter value, may be empty) */
    seatType: FormStarterValueSchema,
    /** Seat availability (starter value, may be empty) */
    isAvailable: FormStarterValueSchema,
    /** Price multiplier (starter value, may be empty) */
    priceMultiplier: FormStarterValueSchema,
    /** X coordinate for seat placement (starter value, may be empty) */
    x: FormStarterValueSchema,
    /** Y coordinate for seat placement (starter value, may be empty) */
    y: FormStarterValueSchema,
});

/**
 * Fully validated seat form schema.
 *
 * Enforces all required fields and proper types for a complete seat:
 * - `theatre` and `screen` must be valid IDs.
 * - `row` must be a non-empty string, max 10 characters.
 * - `seatNumber`, `priceMultiplier`, `x`, and `y` must be positive numbers.
 * - `seatLabel` can be undefined.
 * - `seatType` must be a valid enum value.
 * - `isAvailable` must be a boolean.
 */
export const SeatFormSchema = z.object({
    theatre: IDStringSchema,
    screen: IDStringSchema,
    row: NonEmptyStringSchema.max(10, "Must be 10 characters or less."),
    seatNumber: CleanedPositiveNumberSchema,
    seatLabel: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(50, {message: "Must be 50 characters or less."}).optional()
    ).optional(),
    seatType: SeatTypeEnum,
    isAvailable: CoercedBooleanValueSchema,
    priceMultiplier: CleanedPositiveNumberSchema,
    x: CleanedPositiveNumberSchema,
    y: CleanedPositiveNumberSchema,
});

/**
 * Fields to omit when defining a row of seats.
 *
 * - `seatNumber`, `seatLabel`, and `x` are seat-specific and do not apply
 *   for bulk row creation.
 */
export const seatsByRowOmits: Partial<Record<keyof Pick<SeatForm, "seatNumber" | "seatLabel" | "x">, true>> = {
    seatNumber: true,
    seatLabel: true,
    x: true,
};

/**
 * Schema for form values when creating a row of seats (starter values).
 *
 * - Uses `SeatFormValuesSchema` as a base.
 * - Omits seat-specific fields (`seatNumber`, `seatLabel`, `x`) not needed for bulk creation.
 * - Adds `numberOfSeats` as a starter value for row creation.
 */
export const SeatsByRowFormValuesSchema = SeatFormValuesSchema
    .omit(seatsByRowOmits)
    .extend({numberOfSeats: FormStarterValueSchema});

/**
 * Fully validated schema for creating a row of seats.
 *
 * - Uses `SeatFormSchema` as a base.
 * - Omits seat-specific fields (`seatNumber`, `seatLabel`, `x`) for bulk row creation.
 * - Requires `numberOfSeats` to be a positive number.
 */
export const SeatsByRowFormSchema = SeatFormSchema
    .omit(seatsByRowOmits)
    .extend({numberOfSeats: CleanedPositiveNumberSchema});
