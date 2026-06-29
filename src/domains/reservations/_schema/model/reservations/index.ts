import {
    ReservationBase,
    ReservationBaseSchema
} from "@/domains/reservations/_schema/model/reservations/ReservationBaseSchema.ts";
import {Reservation, ReservationSchema} from "@/domains/reservations/_schema/model/reservations/ReservationSchema.ts";
import {superRefineReservation} from "@/domains/reservations/_schema/model/reservations/ReservationSchemaUtilities.ts";

export {
    ReservationBaseSchema,
    ReservationSchema,
    superRefineReservation,
}

export type {
    Reservation,
    ReservationBase,
}