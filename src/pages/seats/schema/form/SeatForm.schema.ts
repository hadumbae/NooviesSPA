import { z } from "zod";
import { SeatTypeEnum } from "@/pages/seats/schema/SeatType.enum.ts";
import { RequiredBoolean } from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/NonEmptyStringSchema.ts";
import { IDStringSchema } from "@/common/schema/strings/IDStringSchema.ts";
import { CleanedPositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { UndefinedStringSchema } from "@/common/schema/strings/UndefinedStringSchema.ts";
import { FormStarterValueSchema } from "@/common/schema/form/FormStarterValueSchema.ts";
import { SeatForm } from "@/pages/seats/schema/form/SeatForm.types.ts";

/**
 * Schema for initial seat form values.
 *
 * All fields use `FormStarterValueSchema` to allow for starter/default values
 * in forms (e.g., empty or placeholder values) before final validation.
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
 * Enforces all required field validations for a complete seat:
 * - `theatre` and `screen` must be valid IDs
 * - `row` must be a non-empty string, max 10 chars
 * - `seatType` must be a valid enum value
 * - `isAvailable` must be a boolean
 * - `priceMultiplier`, `y`, `seatNumber`, `x` must be positive numbers
 * - `seatLabel` can be undefined
 */
export const SeatFormSchema = z.object({
    theatre: IDStringSchema,
    screen: IDStringSchema,
    row: NonEmptyStringSchema.max(10, "Must be 10 characters or less."),
    seatNumber: CleanedPositiveNumberSchema,
    seatLabel: UndefinedStringSchema,
    seatType: SeatTypeEnum,
    isAvailable: RequiredBoolean,
    priceMultiplier: CleanedPositiveNumberSchema,
    x: CleanedPositiveNumberSchema,
    y: CleanedPositiveNumberSchema,
});

/**
 * Fields from `SeatForm` that are omitted when defining a row of seats.
 *
 * - `seatNumber`, `seatLabel`, and `x` do not apply to bulk row creation.
 */
export const seatsByRowOmits: Partial<Record<keyof SeatForm, true>> = {
    seatNumber: true,
    seatLabel: true,
    x: true,
};

/**
 * Schema for form values when creating a row of seats.
 *
 * Uses `SeatFormSchema` as a base, omits individual seat-specific fields,
 * and adds `numberOfSeats` for bulk row creation.
 *
 * Starter values allow partial or empty inputs before final validation.
 */
export const SeatsByRowFormValuesSchema = SeatFormSchema
    .omit(seatsByRowOmits)
    .extend({ numberOfSeats: FormStarterValueSchema });

/**
 * Fully validated schema for a row of seats.
 *
 * Uses `SeatFormSchema` as a base, omits seat-specific fields,
 * and requires a positive `numberOfSeats` for final validation.
 */
export const SeatsByRowFormSchema = SeatFormSchema
    .omit(seatsByRowOmits)
    .extend({ numberOfSeats: CleanedPositiveNumberSchema });
