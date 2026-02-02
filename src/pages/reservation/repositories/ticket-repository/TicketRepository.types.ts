/**
 * @file TicketRepository.types.ts
 *
 * @summary
 * Type definitions for the ticket reservation repository.
 *
 * @description
 * Defines the public contract for client-side ticket reservation
 * repositories, including endpoint configuration and checkout behavior.
 *
 * This interface intentionally exposes only the operations required
 * by the UI layer.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {ReserveTicketForm} from "@/pages/reservation/schema/forms/ReserveTicketFormSchema.ts";

/**
 * Ticket repository method contract.
 *
 * @remarks
 * Implementations are responsible for:
 * - Constructing request URLs
 * - Submitting validated reservation payloads
 * - Returning normalized API responses
 */
export type TicketRepositoryMethods = {
    /** Base API endpoint for ticket-related requests. */
    baseURL: string;

    /**
     * Executes a ticket reservation checkout request.
     *
     * @param data - Validated reservation form payload
     * @returns Wrapped API response
     */
    reserveTicket(data: ReserveTicketForm): Promise<RequestReturns>;
};
