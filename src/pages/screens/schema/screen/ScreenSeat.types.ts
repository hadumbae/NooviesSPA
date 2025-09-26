import { z } from "zod";
import {
    SeatDetailsByRowArraySchema,
    SeatDetailsByRowSchema,
    SeatsByRowArraySchema,
    SeatsByRowSchema
} from "@/pages/screens/schema/screen/ScreenSeat.schema.ts";

/**
 * Type representing a row of seats.
 * Mirrors the structure defined by `SeatsByRowSchema`.
 */
export type SeatsByRow = z.infer<typeof SeatsByRowSchema>;

/**
 * Type representing a row of seats with detailed seat information.
 * Mirrors the structure defined by `SeatDetailsByRowSchema`.
 */
export type SeatDetailsByRow = z.infer<typeof SeatDetailsByRowSchema>;

/**
 * Type representing multiple rows of seats.
 * Mirrors the structure defined by `SeatsByRowArraySchema`.
 */
export type SeatsByRowArray = z.infer<typeof SeatsByRowArraySchema>;

/**
 * Type representing multiple rows of seats with detailed seat information.
 * Mirrors the structure defined by `SeatDetailsByRowArraySchema`.
 */
export type SeatDetailsByRowArray = z.infer<typeof SeatDetailsByRowArraySchema>;
