import {z, ZodType, ZodTypeDef} from "zod";
import {SeatTypeEnum} from "@/pages/seats/schema/SeatType.enum.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {CleanedNonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";
import ISeatSubmit from "@/pages/seats/interfaces/ISeatSubmit.ts";

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
 * Zod schema that validates and transforms the seat form input
 * into structured values suitable for processing or storage.
 *
 * Compared to `SeatFormValuesSchema`, this version applies concrete constraints:
 * - `row` and `seatNumber`: non-empty strings, max 50 characters
 * - `seatType`: enum-validated value
 * - `isAvailable`: strictly `true` or `false`
 * - `priceMultiplier`: coerced and cleaned non-negative number
 * - `theatre` and `screen`: ID strings
 *
 * Use this for validating processed form values before submission or storage.
 */
export const SeatFormRawSchema = SeatFormValuesSchema.extend({
    row: NonEmptyStringSchema.max(50, "Must be 50 characters or less."),
    seatNumber: NonEmptyStringSchema.max(50, "Must be 50 characters or less."),
    seatType: SeatTypeEnum,
    isAvailable: RequiredBoolean,
    priceMultiplier: CleanedNonNegativeNumberSchema,
    theatre: IDStringSchema,
    screen: IDStringSchema,
});

/**
 * Strongly-typed Zod schema representing a complete, validated `ISeatSubmit` object.
 *
 * This schema:
 * - Validates `unknown` input (e.g., from an HTML form)
 * - Outputs an object conforming to the `ISeatSubmit` TypeScript interface
 * - Allows use of `z.preprocess`-based fields like `CleanedNonNegativeNumberSchema`
 *
 * Useful as a final parsing step before consuming form input in business logic.
 */
export const SeatFormSchema = SeatFormRawSchema as ZodType<ISeatSubmit, ZodTypeDef, unknown>;

