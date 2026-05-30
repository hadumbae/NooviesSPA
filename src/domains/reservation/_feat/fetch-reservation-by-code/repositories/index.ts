import {getFetchByCode} from "@/domains/reservation/_feat/fetch-reservation-by-code/repositories/repository.ts";
import {
    GetFetchByCodeParams
} from "@/domains/reservation/_feat/fetch-reservation-by-code/repositories/repository.types.ts";
import {
    FetchReservationByCodeBaseURL
} from "@/domains/reservation/_feat/fetch-reservation-by-code/repositories/baseURL.ts";

export {
    FetchReservationByCodeBaseURL,
    getFetchByCode,
}

export type {
    GetFetchByCodeParams
}