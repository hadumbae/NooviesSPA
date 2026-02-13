/**
 * @file TicketRepository.ts
 * Client-side ticket reservation API adapter.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {ReserveTicketForm} from "@/pages/reservation/schema/forms/ReserveTicketFormSchema.ts";
import {TicketRepositoryMethods} from "@/pages/reservation/repositories/ticket-repository/TicketRepository.types.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * UI-facing repository for reservation requests.
 */
const repository: TicketRepositoryMethods = {
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/tickets`,

    reserveTicket(data: ReserveTicketForm): Promise<RequestReturns> {
        const url = buildQueryURL({
            baseURL: this.baseURL,
            path: "reserve",
        });

        return useFetchAPI({method: "POST", url, data});
    },

    checkoutTicket(_id: ObjectId): Promise<RequestReturns> {
        const url = buildQueryURL({
            baseURL: this.baseURL,
            path: `checkout/${_id}`,
        });

        return useFetchAPI({method: "PATCH", url});
    },

    cancelReservation(_id: ObjectId): Promise<RequestReturns> {
        const url = buildQueryURL({
            baseURL: this.baseURL,
            path: `cancel/${_id}`,
        });

        return useFetchAPI({method: "PATCH", url});
    }
};

export {
    repository as TicketRepository,
};
