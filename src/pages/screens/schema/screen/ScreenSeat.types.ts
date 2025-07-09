import {z} from "zod";
import {
    SeatDetailsByRowArraySchema,
    SeatDetailsByRowSchema,
    SeatsByRowArraySchema,
    SeatsByRowSchema
} from "@/pages/screens/schema/screen/ScreenSeat.schema.ts";

/**
 * Type representing a group of seats in a single row.
 * Includes row identifier, number of seats, and an array of {@link Seat} objects.
 * Inferred from {@link SeatsByRowSchema}.
 */
export type SeatsByRow = z.infer<typeof SeatsByRowSchema>;

/**
 * Type representing an array of {@link SeatsByRow}.
 * Used when multiple rows of seats are grouped together.
 * Inferred from {@link SeatsByRowArraySchema}.
 */
export type SeatsByRowArray = z.infer<typeof SeatsByRowArraySchema>;

/**
 * Type representing a group of seats in a single row with full seat details.
 * Includes row identifier, number of seats, and an array of {@link SeatDetails} objects.
 * Inferred from {@link SeatDetailsByRowSchema}.
 */
export type SeatDetailsByRow = z.infer<typeof SeatDetailsByRowSchema>;

/**
 * Type representing an array of {@link SeatDetailsByRow}.
 * Used when multiple rows of fully detailed seats are grouped together.
 * Inferred from {@link SeatDetailsByRowArraySchema}.
 */
export type SeatDetailsByRowArray = z.infer<typeof SeatDetailsByRowArraySchema>;
