import { z } from "zod";
import {
    PaginatedSeatDetailsSchema,
    PaginatedSeatSchema,
    SeatArraySchema,
    SeatDetailsArraySchema
} from "@/pages/seats/schema/seat/SeatRelated.schema.ts";

/**
 * ## SeatArray
 *
 * TypeScript type representing an array of {@link Seat} objects.
 * Inferred from {@link SeatArraySchema}.
 *
 * @remarks
 * Useful for endpoints or functions returning multiple minimal seat objects
 * without fully populated theatre or screen details.
 */
export type SeatArray = z.infer<typeof SeatArraySchema>;

/**
 * ## SeatDetailsArray
 *
 * TypeScript type representing an array of {@link SeatDetails} objects.
 * Inferred from {@link SeatDetailsArraySchema}.
 *
 * @remarks
 * Each item includes fully populated theatre and screen objects.
 */
export type SeatDetailsArray = z.infer<typeof SeatDetailsArraySchema>;

/**
 * ## PaginatedSeats
 *
 * TypeScript type representing a paginated list of {@link Seat} objects.
 * Inferred from {@link PaginatedSeatSchema}.
 *
 * @remarks
 * Includes standard pagination metadata (`page`, `limit`, `total`, etc.)
 * alongside the array of minimal seat items.
 */
export type PaginatedSeats = z.infer<typeof PaginatedSeatSchema>;

/**
 * ## PaginatedSeatDetails
 *
 * TypeScript type representing a paginated list of {@link SeatDetails} objects.
 * Inferred from {@link PaginatedSeatDetailsSchema}.
 *
 * @remarks
 * Each item in the paginated response includes fully populated theatre and screen objects.
 * Also contains standard pagination metadata.
 */
export type PaginatedSeatDetails = z.infer<typeof PaginatedSeatDetailsSchema>;
