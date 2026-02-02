/**
 * @file TicketRepository.ts
 *
 * @summary
 * Client-side repository for ticket reservation requests.
 *
 * @description
 * Provides a thin abstraction over the ticket reservation API,
 * responsible for:
 * - Building request URLs
 * - Submitting validated checkout payloads
 * - Returning normalized API responses
 *
 * This repository contains no business logic and delegates
 * request execution to shared fetch utilities.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {ReserveTicketForm} from "@/pages/reservation/schema/forms/ReserveTicketFormSchema.ts";
import {TicketRepositoryMethods} from "@/pages/reservation/repositories/ticket-repository/TicketRepository.types.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

/**
 * Ticket repository implementation.
 *
 * @remarks
 * Acts as the client-facing boundary for reservation checkout.
 */
const repository: TicketRepositoryMethods = {
    /** Base API endpoint for ticket operations. */
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/tickets`,

    /**
     * Submits a reservation checkout request.
     *
     * @param data - Validated reservation form payload
     * @returns Wrapped API response
     */
    reserveTicket(data: ReserveTicketForm): Promise<RequestReturns> {
        const url = buildQueryURL({
            baseURL: this.baseURL,
            path: "reserve",
        });

        return useFetchAPI({method: "POST", url, data});
    },
};

export {
    repository as TicketRepository,
};
