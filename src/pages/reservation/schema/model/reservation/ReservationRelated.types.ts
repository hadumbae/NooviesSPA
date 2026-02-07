/**
 * @file ReservationRelated.types.ts
 *
 * Type definitions derived from reservation-related schemas.
 * Mirrors array and paginated reservation shapes.
 */

import {z} from "zod";
import {
    PaginatedReservationDetailsSchema,
    ReservationDetailsArraySchema
} from "@/pages/reservation/schema/model/reservation/ReservationRelated.schema.ts";

/**
 * Type representing an array of reservation details.
 */
export type ReservationDetailsArray =
    z.infer<typeof ReservationDetailsArraySchema>;

/**
 * Type representing a paginated collection of reservation details.
 */
export type PaginatedReservationDetails =
    z.infer<typeof PaginatedReservationDetailsSchema>;
