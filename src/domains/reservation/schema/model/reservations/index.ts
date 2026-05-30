import {
    ReservationBase,
    ReservationBaseSchema
} from "@/domains/reservation/schema/model/reservations/ReservationBaseSchema.ts";
import {Reservation, ReservationSchema} from "@/domains/reservation/schema/model/reservations/ReservationSchema.ts";
import {superRefineReservation} from "@/domains/reservation/schema/model/reservations/ReservationSchemaUtilities.ts";

export {
    ReservationBaseSchema,
    ReservationSchema,
    superRefineReservation,
}

export type {
    Reservation,
    ReservationBase,
}