import { z } from "zod";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { SeatDetailsSchema, SeatSchema } from "@/pages/seats/schema/seat/Seat.schema.ts";

/**
 * Schema representing seats grouped by a single row.
 */
export const SeatsByRowSchema = z.object({
    /** Identifier or label for the row (e.g., "A", "B") */
    row: NonEmptyStringSchema,

    /** Total number of seats in this row */
    numberOfSeats: PositiveNumberSchema,

    /** Array of seats in this row */
    seats: z.array(
        z.lazy(() => SeatSchema),
        { message: "Must be an array of seats." }
    ),
});

/**
 * Schema representing detailed seats grouped by a single row.
 * Extends `SeatsByRowSchema` with detailed seat information.
 */
export const SeatDetailsByRowSchema = SeatsByRowSchema.extend({
    /** Array of seat details in this row */
    seats: z.array(
        z.lazy(() => SeatDetailsSchema),
        { message: "Must be an array of seats with details." }
    ),
});

/** Array of `SeatsByRowSchema` objects */
export const SeatsByRowArraySchema = z.array(
    SeatsByRowSchema,
    { message: "Must be an array of seats by row." }
);

/** Array of `SeatDetailsByRowSchema` objects */
export const SeatDetailsByRowArraySchema = z.array(
    SeatDetailsByRowSchema,
    { message: "Must be an array of seats by row." }
);
