import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {SeatTypeEnum} from "@/pages/seats/schema/SeatTypeEnum.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/PositiveNumberSchema.ts";

/**
 * Zod schema for validating seat filter query parameters.
 *
 * This schema defines optional filters that can be used to query seat data.
 * Each field corresponds to a filterable property of a seat record.
 *
 * Fields:
 * - `_id`: Optional string representing the seat's unique ID.
 * - `row`: Optional non-empty string representing the row label.
 * - `seatNumber`: Optional non-empty string representing the seat number.
 * - `seatType`: Optional enum representing the type of seat (e.g. regular, VIP).
 * - `isAvailable`: Optional boolean indicating seat availability.
 * - `priceMultiplier`: Optional positive number representing price adjustment.
 * - `theatre`: Optional string representing the associated theatre ID.
 * - `screen`: Optional string representing the associated screen ID.
 *
 * @example
 * Valid filters:
 * ```
 * { row: "A", isAvailable: true }
 * { seatType: "VIP", theatre: "64c123abc456def7890abcde" }
 * { priceMultiplier: 1.5 }
 * ```
 */
export const SeatFilterQuerySchema = z.object({
    _id: IDStringSchema.optional(),
    row: NonEmptyStringSchema.optional(),
    seatNumber: NonEmptyStringSchema.optional(),
    seatType: SeatTypeEnum.optional(),
    isAvailable: RequiredBoolean.optional(),
    priceMultiplier: PositiveNumberSchema.optional(),
    theatre: IDStringSchema.optional(),
    screen: IDStringSchema.optional(),
});

/**
 * Inferred TypeScript type from `SeatFilterQuerySchema`.
 *
 * Represents the structure of validated filter parameters used when querying seat data.
 */
export type SeatFilterQuery = z.infer<typeof SeatFilterQuerySchema>;