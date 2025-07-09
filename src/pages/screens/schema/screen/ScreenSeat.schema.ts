import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {SeatDetailsSchema, SeatSchema} from "@/pages/seats/schema/seat/Seat.schema.ts";

/**
 * Base schema representing a group of seats in a single row.
 * Contains the row identifier and the number of seats in that row.
 */
export const SeatsByRowBaseSchema = z.object({
    row: NonEmptyStringSchema,
    numberOfSeats: PositiveNumberSchema,
});

/**
 * Schema representing a group of seats in a row,
 * where each seat is represented as a {@link Seat}.
 * Includes the row identifier, number of seats, and an array of seats.
 */
export const SeatsByRowSchema = SeatsByRowBaseSchema.extend({
    seats: z.array(
        z.lazy(() => SeatSchema),
        {message: "Must be an array of seats."},
    ),
});

/**
 * Schema representing an array of {@link SeatsByRowSchema}.
 * Used when multiple rows of seats need to be validated together.
 */
export const SeatsByRowArraySchema = z.array(
    SeatsByRowSchema,
    {message: "Must be an array of seats by row."},
);

/**
 * Schema representing a group of seats in a row,
 * where each seat is represented as a {@link SeatDetails} with full details.
 * Includes the row identifier, number of seats, and an array of detailed seats.
 */
export const SeatDetailsByRowSchema = SeatsByRowBaseSchema.extend({
    seats: z.array(
        z.lazy(() => SeatDetailsSchema),
        {message: "Must be an array of seats with details."},
    ),
});

/**
 * Schema representing an array of {@link SeatDetailsByRowSchema}.
 * Used when multiple rows of fully detailed seats need to be validated together.
 */
export const SeatDetailsByRowArraySchema = z.array(
    SeatDetailsByRowSchema,
    {message: "Must be an array of seats by row."},
);
