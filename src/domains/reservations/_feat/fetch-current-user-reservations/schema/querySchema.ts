/** @fileoverview Schema and type definitions for querying the current user's reservations. */

import {z} from "zod";
import {ReservationBaseQueryOptionSchema} from "@/domains/reservations/_schema";

/** Zod schema for validating current user reservation query parameters. */
export const CurrentUserReservationsQueryOptionSchema = ReservationBaseQueryOptionSchema.pick({
    uniqueCode: true,
    status: true,
    type: true,
    sortByStatus: true,
    sortByDateReserved: true,
});

/** Type inferred from the current user reservations query schema. */
export type CurrentUserReservationsQueryOptions = z.infer<typeof CurrentUserReservationsQueryOptionSchema>;