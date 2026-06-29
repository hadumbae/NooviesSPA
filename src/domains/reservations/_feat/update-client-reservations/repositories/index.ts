import {
    patchCancelClientReservation,
    patchCheckoutTicket
} from "@/domains/reservations/_feat/update-client-reservations/repositories/repository.ts";
import {
    UpdateClientReservationBaseURL
} from "@/domains/reservations/_feat/update-client-reservations/repositories/baseURL.ts";

export {
    UpdateClientReservationBaseURL,
    patchCheckoutTicket,
    patchCancelClientReservation,
}
