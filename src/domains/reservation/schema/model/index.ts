import {
    PopulatedReservationBaseSchema,
    PopulatedReservationBase
} from "@/domains/reservation/schema/model/PopulatedReservationBaseSchema.ts";
import {
    PopulatedReservation,
    PopulatedReservationSchema
} from "@/domains/reservation/schema/model/PopulatedReservationSchema.ts";
import {
    PopulatedReservationArray,
    PopulatedReservationArraySchema
} from "@/domains/reservation/schema/model/PopulatedReservationArraySchema.ts";
import {ReservationBase, ReservationBaseSchema} from "@/domains/reservation/schema/model/ReservationBaseSchema.ts";
import {
    PaginatedPopulatedReservations,
    PaginatedPopulatedReservationSchema
} from "@/domains/reservation/schema/model/ReservationPaginatedSchemas.ts";
import {Reservation, ReservationSchema} from "@/domains/reservation/schema/model/ReservationSchema.ts";
import {
    ReservationUniqueCode,
    ReservationUniqueCodeSchema
} from "@/domains/reservation/schema/model/fields/ReservationUniqueCodeSchema.ts";
import {
    ReservationStatus,
    ReservationStatusEnumSchema
} from "@/domains/reservation/schema/model/fields/ReservationStatusEnumSchema.ts";
import {ReservationTypeEnumSchema, ReservationType} from "@/domains/reservation/schema/model/fields/ReservationTypeEnumSchema.ts";

export {
    ReservationSchema,
    ReservationBaseSchema,
    PopulatedReservationSchema,
    PopulatedReservationBaseSchema,
    PopulatedReservationArraySchema,
    PaginatedPopulatedReservationSchema,
    ReservationUniqueCodeSchema,
    ReservationStatusEnumSchema,
    ReservationTypeEnumSchema,
}

export type {
    Reservation,
    ReservationBase,
    PopulatedReservation,
    PopulatedReservationBase,
    PopulatedReservationArray,
    PaginatedPopulatedReservations,
    ReservationUniqueCode,
    ReservationStatus,
    ReservationType,
}