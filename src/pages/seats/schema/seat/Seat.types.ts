import {z} from "zod";
import {
    PaginatedSeatDetailsSchema,
    PaginatedSeatSchema,
    SeatArraySchema,
    SeatDetailsSchema,
    SeatSchema
} from "@/pages/seats/schema/seat/Seat.schema.ts";

/**
 * Type representing a seat, inferred from {@link SeatSchema}.
 * Theatre and screen references may be either IDs or populated objects.
 */
export type Seat = z.infer<typeof SeatSchema>;

/**
 * Type representing a seat with fully populated theatre and screen objects.
 * Inferred from {@link SeatDetailsSchema}.
 */
export type SeatDetails = z.infer<typeof SeatDetailsSchema>;

/**
 * Type representing an array of {@link Seat} objects.
 * Inferred from {@link SeatArraySchema}.
 */
export type SeatArray = z.infer<typeof SeatArraySchema>;

/**
 * Type representing a paginated list of {@link Seat} objects.
 * Includes pagination metadata and items.
 * Inferred from {@link PaginatedSeatSchema}.
 */
export type PaginatedSeats = z.infer<typeof PaginatedSeatSchema>;

/**
 * Type representing a paginated list of {@link SeatDetails} objects.
 * Includes pagination metadata and detailed seat items.
 * Inferred from {@link PaginatedSeatDetailsSchema}.
 */
export type PaginatedSeatDetails = z.infer<typeof PaginatedSeatDetailsSchema>;