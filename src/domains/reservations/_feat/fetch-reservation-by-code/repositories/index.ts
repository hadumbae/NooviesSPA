import {getFetchByCode} from "@/domains/reservations/_feat/fetch-reservation-by-code/repositories/repository.ts";
import {
    GetFetchByCodeParams
} from "@/domains/reservations/_feat/fetch-reservation-by-code/repositories/repository.types.ts";
import {
    FetchReservationByCodeBaseURL
} from "@/domains/reservations/_feat/fetch-reservation-by-code/repositories/baseURL.ts";

export {
    FetchReservationByCodeBaseURL,
    getFetchByCode,
}

export type {
    GetFetchByCodeParams
}