import {
    useFetchReservationsForCurrentUser
} from "@/domains/reservation/_feat/fetch-client-reservations/fetch/useFetchReservationsForCurrentUser.ts";
import {useFetchReservation} from "@/domains/reservation/_feat/fetch-client-reservations/fetch/useFetchReservation.ts";
import {
    useFetchReservationBySlug
} from "@/domains/reservation/_feat/fetch-client-reservations/fetch/useFetchReservationBySlug.ts";

export {
    useFetchReservation,
    useFetchReservationBySlug,
    useFetchReservationsForCurrentUser
}