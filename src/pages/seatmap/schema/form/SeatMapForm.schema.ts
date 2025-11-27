/**
 * # SeatMap Form Schemas
 *
 * This module defines the Zod schemas used for validating and shaping seat map
 * form data. It includes:
 *
 * - **SeatMapFormSchema**: The core validation schema for seat map form fields.
 * - **SeatMapFormValuesSchema**: A form-friendly schema generated for UI layer
 *   integration (e.g., React Hook Form), via `generateFormValueSchema`.
 *
 * ## Key Features
 * - Automatic preprocessing of empty string inputs for `price`, converting them
 *   into `undefined` using `preprocessEmptyStringToUndefined`.
 * - Coerced numeric parsing via `CoercedPositiveNumberSchema`, allowing string
 *   inputs such as `"450"` to be converted into numbers.
 * - Strict ID validation using `IDStringSchema`.
 * - Strong, typed seat-status validation with `SeatMapStatusEnum`.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    CoercedPositiveNumberSchema
} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {SeatMapStatusEnum} from "@/pages/seatmap/schema/enum/SeatMapStatusEnum.ts";
import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";

/**
 * ## SeatMapFormSchema
 *
 * The base schema for validating raw seat map form input.
 *
 * ### Field Details
 * - **seat** — Required. Must be a valid ObjectId string.
 * - **showing** — Required. Must be a valid ObjectId string.
 * - **price**
 *   - Optional.
 *   - Accepts empty strings and treats them as `undefined`.
 *   - When provided, coerces values into positive numbers.
 *   - Uses: `preprocessEmptyStringToUndefined(CoercedPositiveNumberSchema.optional())`.
 * - **status** — Required. Must be a value from `SeatMapStatusEnum`.
 *
 * @example
 * SeatMapFormSchema.parse({
 *   seat: "6530a8121e4f09c92f123abc",
 *   showing: "6530a8121e4f09c92f123def",
 *   price: "450",        // coerced to number
 *   status: "AVAILABLE"
 * });
 *
 * @example
 * // Acceptable: empty price becomes undefined
 * SeatMapFormSchema.parse({
 *   seat: "6530a8121e4f09c92f123abc",
 *   showing: "6530a8121e4f09c92f123def",
 *   price: "",
 *   status: "RESERVED"
 * });
 */
export const SeatMapFormSchema = z.object({
    seat: IDStringSchema,
    showing: IDStringSchema,
    price: preprocessEmptyStringToUndefined(
        CoercedPositiveNumberSchema.optional()
    ).optional(),
    status: SeatMapStatusEnum,
});

/**
 * ## SeatMapFormValuesSchema
 *
 * A schema tailored for use in form libraries, generated from
 * `SeatMapFormSchema` by `generateFormValueSchema`.
 *
 * This schema typically:
 * - Allows intermediate/partial values when editing.
 * - Standardizes optional/undefined handling for fields.
 * - Ensures the final parsed output still conforms to the base schema.
 *
 * @param schema - The underlying validation schema (`SeatMapFormSchema`).
 * @returns A transformed Zod schema suitable for use as form values.
 *
 * @example
 * const values = SeatMapFormValuesSchema.parse({
 *   price: "",
 *   seat: "6530a8121e4f09c92f123abc",
 *   showing: "6530a8121e4f09c92f123def",
 *   status: "SOLD"
 * });
 */
export const SeatMapFormValuesSchema = generateFormValueSchema(SeatMapFormSchema);
