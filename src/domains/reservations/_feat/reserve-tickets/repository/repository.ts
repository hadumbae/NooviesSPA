/**
 * @fileoverview Repository for handling ticket reservation API requests.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {ReserveTicketFormData} from "@/domains/reservations/_feat/reserve-tickets/schema/ReserveTicketFormSchema.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import {ReserveTicketBaseURL} from "@/domains/reservations/_feat/reserve-tickets/repository/baseURL.ts";

/** Submits a ticket reservation request to the backend service. */
export function postReserveTicket(data: ReserveTicketFormData): Promise<FetchRequestReturns> {
    const url = buildURL({
        baseURL: ReserveTicketBaseURL,
        path: "/reserve",
    });

    return useFetchAPI({method: "POST", url, data});
}