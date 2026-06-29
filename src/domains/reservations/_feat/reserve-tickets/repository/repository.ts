/**
 * @file TicketRepository.ts
 * Client-side ticket reservation API adapter.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {ReserveTicketFormData} from "@/domains/reservations/_feat/reserve-tickets/schema/ReserveTicketFormSchema.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import {ReserveTicketBaseURL} from "@/domains/reservations/_feat/reserve-tickets/repository/baseURL.ts";
export const reserveTicket = (
    data: ReserveTicketFormData
): Promise<RequestReturns> => {
    const url = buildURL({
        baseURL: ReserveTicketBaseURL,
        path: "/reserve",
    });

    return useFetchAPI({method: "POST", url, data});
};

