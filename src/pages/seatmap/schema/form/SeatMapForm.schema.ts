/**
 * @file SeatMapFormSchemas.ts
 * @summary Zod schemas for validating and shaping SeatMap form data.
 *
 * Provides:
 * - `SeatMapFormSchema`: Core schema for raw form input.
 * - `SeatMapFormValuesSchema`: Form-friendly schema for UI layer integration.
 *
 * Features:
 * - Converts empty string inputs to `undefined`.
 * - Coerces numeric strings into positive numbers.
 * - Validates ObjectId strings and seat map status.
 */

import { z } from "zod";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { CoercedPositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { SeatMapStatusEnum } from "@/pages/seatmap/schema/enum/SeatMapStatusEnum.ts";
import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";

/**
 * @summary Base schema for validating raw SeatMap form input.
 *
 * @description
 * Validates seat map form fields including seat ID, showing ID, pricing, and status.
 *
 * @fields
 * - `seat`: Required, must be a valid ObjectId string.
 * - `showing`: Required, must be a valid ObjectId string.
 * - `basePrice`: Optional, coerces numeric string to positive number; empty string → undefined.
 * - `priceMultiplier`: Optional, coerces numeric string to positive number; empty string → undefined.
 * - `overridePrice`: Optional, coerces numeric string to positive number; empty string → undefined.
 * - `status`: Required, must be a value from `SeatMapStatusEnum`.
 *
 * @example
 * SeatMapFormSchema.parse({
 *   seat: "6530a8121e4f09c92f123abc",
 *   showing: "6530a8121e4f09c92f123def",
 *   basePrice: "450",
 *   priceMultiplier: "1.5",
 *   overridePrice: "",
 *   status: "AVAILABLE"
 * });
 */
export const SeatMapFormSchema = z.object({
    seat: IDStringSchema,
    showing: IDStringSchema,
    basePrice: preprocessEmptyStringToUndefined(CoercedPositiveNumberSchema),
    priceMultiplier: preprocessEmptyStringToUndefined(CoercedPositiveNumberSchema),
    overridePrice: preprocessEmptyStringToUndefined(CoercedPositiveNumberSchema.optional()).optional(),
    status: SeatMapStatusEnum,
});

/**
 * @summary Form-friendly schema generated from `SeatMapFormSchema`.
 *
 * @description
 * Tailored for integration with form libraries (e.g., React Hook Form):
 * - Supports intermediate/partial values during editing.
 * - Handles empty/optional fields gracefully.
 * - Ensures final parsed output conforms to `SeatMapFormSchema`.
 *
 * @example
 * const values = SeatMapFormValuesSchema.parse({
 *   basePrice: "",
 *   priceMultiplier: "1.2",
 *   seat: "6530a8121e4f09c92f123abc",
 *   showing: "6530a8121e4f09c92f123def",
 *   status: "SOLD"
 * });
 */
export const SeatMapFormValuesSchema = generateFormValueSchema(SeatMapFormSchema);
