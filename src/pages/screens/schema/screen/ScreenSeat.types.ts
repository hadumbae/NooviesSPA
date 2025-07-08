import {z} from "zod";
import {SeatDetailsByRowSchema, SeatsByRowSchema} from "@/pages/screens/schema/screen/ScreenSeat.schema.ts";

/**
 * Type representing a group of seats in a single row.
 * Includes row identifier, number of seats, and an array of {@link Seat} objects.
 * Inferred from {@link SeatsByRowSchema}.
 */
export type SeatsByRow = z.infer<typeof SeatsByRowSchema>;

/**
 * Type representing a group of seats in a single row with full seat details.
 * Includes row identifier, number of seats, and an array of {@link SeatDetails} objects.
 * Inferred from {@link SeatDetailsByRowSchema}.
 */
export type SeatDetailsByRow = z.infer<typeof SeatDetailsByRowSchema>;