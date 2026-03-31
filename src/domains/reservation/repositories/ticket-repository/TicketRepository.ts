/**
 * @file TicketRepository.ts
 * Client-side ticket reservation API adapter.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {ReserveTicketForm} from "@/domains/reservation/schema/forms/ReserveTicketFormSchema.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/feat/reserve-tickets`;

export const reserveTicket = (
    data: ReserveTicketForm
): Promise<RequestReturns> => {
    const url = buildQueryURL({
        baseURL: baseURL,
        path: "reserve",
    });

    return useFetchAPI({method: "POST", url, data});
};

