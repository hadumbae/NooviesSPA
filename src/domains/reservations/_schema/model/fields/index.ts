import {
    ReservationStatus,
    ReservationStatusEnumSchema
} from "@/domains/reservations/_schema/model/fields/ReservationStatusEnumSchema.ts";
import {
    type ReservationType,
    ReservationTypeEnumSchema
} from "@/domains/reservations/_schema/model/fields/ReservationTypeEnumSchema.ts";
import {
    type ReservationUniqueCode,
    ReservationUniqueCodeSchema
} from "@/domains/reservations/_schema/model/fields/ReservationUniqueCodeSchema.ts";
import {ReservationStatusConstant} from "@/domains/reservations/_schema/model/fields/ReservationStatusConstant.ts";
import {ReservationTypeConstant} from "@/domains/reservations/_schema/model/fields/ReservationTypeConstant.ts";

export {
    ReservationTypeConstant,
    ReservationStatusConstant,
    ReservationStatusEnumSchema,
    ReservationTypeEnumSchema,
    ReservationUniqueCodeSchema,
}

export type {
    ReservationStatus,
    ReservationType,
    ReservationUniqueCode,
}