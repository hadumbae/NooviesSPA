import {z} from "zod";
import {
    PaginatedSeatDetailsSchema,
    PaginatedSeatSchema,
    SeatArraySchema,
    SeatDetailsSchema,
    SeatSchema
} from "@/pages/seats/schema/seat/Seat.schema.ts";

/**
 * Type representing a single seat with raw or partially populated data.
 * Based on {@link SeatSchema}.
 */
export type Seat = z.infer<typeof SeatSchema>;

/**
 * Type representing a single seat with fully populated theatre and screen data.
 * Based on {@link SeatDetailsSchema}.
 */
export type SeatDetails = z.infer<typeof SeatDetailsSchema>;

/**
 * Type representing an array of {@link Seat}.
 * Based on {@link SeatArraySchema}.
 */
export type SeatArray = z.infer<typeof SeatArraySchema>;

/**
 * Type representing a paginated result of {@link Seat} objects.
 * Based on {@link PaginatedSeatSchema}.
 */
export type PaginatedSeats = z.infer<typeof PaginatedSeatSchema>;

export type PaginatedSeatDetails = z.infer<typeof PaginatedSeatDetailsSchema>;