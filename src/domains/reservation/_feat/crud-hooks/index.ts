import {useFetchReservation} from "@/domains/reservation/_feat/crud-hooks/useFetchReservation.ts";
import {useFetchReservationBySlug} from "@/domains/reservation/_feat/crud-hooks/useFetchReservationBySlug.ts";
import {ReservationCRUDQueryKeys} from "@/domains/reservation/_feat/crud-hooks/queryKeys.ts";

export {
    ReservationCRUDQueryKeys,
    useFetchReservation,
    useFetchReservationBySlug,
}

