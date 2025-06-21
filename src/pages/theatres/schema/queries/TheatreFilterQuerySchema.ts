import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";

/**
 * Zod schema for validating theatre filter query parameters.
 *
 * This schema is used to validate optional filters for querying theatres.
 * Each field is optional, allowing for partial filtering:
 *
 * - `_id`: Optional string representing the unique ID of the theatre.
 * - `name`: Optional non-empty string for filtering by theatre name.
 * - `location`: Optional non-empty string for filtering by location.
 * - `seatCapacity`: Optional number indicating the required seating capacity.
 *
 * @example
 * Valid inputs:
 * ```
 * { name: "Grand Theatre" }
 * { location: "Downtown", seatCapacity: 120 }
 * { _id: "64b7f64e4e1a8e3cce8e7f9d" }
 * ```
 */
export const TheatreFilterQuerySchema = z.object({
    _id: IDStringSchema.optional(),
    name: NonEmptyStringSchema.optional(),
    location: NonEmptyStringSchema.optional(),
    seatCapacity: RequiredNumberSchema.optional(),
});

/**
 * Inferred TypeScript type from `TheatreFilterQuerySchema`.
 *
 * Represents the structure of validated query parameters used to filter theatre data.
 */
export type TheatreFilterQuery = z.infer<typeof TheatreFilterQuerySchema>;