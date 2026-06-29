import {useFetchReservation} from "@/domains/reservations/_feat/crud-hooks/useFetchReservation.ts";
import {useFetchReservationBySlug} from "@/domains/reservations/_feat/crud-hooks/useFetchReservationBySlug.ts";
import {ReservationCRUDQueryKeys} from "@/domains/reservations/_feat/crud-hooks/queryKeys.ts";

export {
    ReservationCRUDQueryKeys,
    useFetchReservation,
    useFetchReservationBySlug,
}

