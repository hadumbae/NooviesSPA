/**
 * @file TicketRepository.ts
 * Client-side ticket reservation API adapter.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {ReserveTicketFormData} from "@/domains/reservation/_feat/reserve-tickets/schema/ReserveTicketFormSchema.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/feat/reserve-tickets`;

export const reserveTicket = (
    data: ReserveTicketFormData
): Promise<RequestReturns> => {
    const url = buildQueryURL({
        baseURL: baseURL,
        path: "reserve",
    });

    return useFetchAPI({method: "POST", url, data});
};

