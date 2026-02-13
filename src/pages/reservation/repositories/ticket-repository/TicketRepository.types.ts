/**
 * @file TicketRepository.types.ts
 * UI-facing contract for ticket reservation repositories.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {ReserveTicketForm} from "@/pages/reservation/schema/forms/ReserveTicketFormSchema.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Ticket reservation repository interface.
 */
export type TicketRepositoryMethods = {
    baseURL: string;
    reserveTicket(data: ReserveTicketForm): Promise<RequestReturns>;
    checkoutTicket(_id: ObjectId): Promise<RequestReturns>;
    cancelReservation(_id: ObjectId): Promise<RequestReturns>;
};
