import {z, ZodType} from "zod";
import ISeatSubmit from "@/pages/seats/interfaces/ISeatSubmit.ts";
import {SeatTypeEnum} from "@/pages/seats/schema/SeatType.enum.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/NonNegativeNumberSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";

/**
 * Zod schema representing the raw form values before transformation or validation.
 *
 * All fields are validated using `FormStarterValueSchema`, which typically allows
 * initial values like empty strings or `null` before stricter validation is applied.
 *
 * This schema is useful for working with uncontrolled form inputs or initializing
 * controlled fields before user interaction.
 *
 * Fields:
 * - `row`: initial value for seat row
 * - `seatNumber`: initial value for seat number
 * - `seatType`: initial value for seat type
 * - `isAvailable`: initial value for availability toggle
 * - `priceMultiplier`: initial value for price multiplier
 * - `theatre`: initial value for associated theatre
 * - `screen`: initial value for associated screen
 */
export const SeatFormValuesSchema = z.object({
    row: FormStarterValueSchema,
    seatNumber: FormStarterValueSchema,
    seatType: FormStarterValueSchema,
    isAvailable: FormStarterValueSchema,
    priceMultiplier: FormStarterValueSchema,
    theatre: FormStarterValueSchema,
    screen: FormStarterValueSchema,
});

/**
 * Zod schema for validated seat form submission.
 *
 * This schema is built on top of `SeatFormValuesSchema` and transforms
 * the starter values into their strictly validated forms.
 *
 * This is used to validate the final form submission after input sanitization.
 * It enforces:
 * - non-empty and length-limited strings for `row` and `seatNumber`
 * - strict `SeatTypeEnum` for seat type
 * - required boolean for availability
 * - non-negative number for price multiplier
 * - valid ID strings for `theatre` and `screen`
 *
 * This schema is explicitly typed to `ISeatSubmit`.
 */
export const SeatFormSchema: ZodType<ISeatSubmit> = SeatFormValuesSchema.extend({
    row: NonEmptyStringSchema.max(50, "Must be 50 characters or less."),
    seatNumber: NonEmptyStringSchema.max(50, "Must be 50 characters or less."),
    seatType: SeatTypeEnum,
    isAvailable: RequiredBoolean,
    priceMultiplier: NonNegativeNumberSchema,
    theatre: IDStringSchema,
    screen: IDStringSchema,
});

