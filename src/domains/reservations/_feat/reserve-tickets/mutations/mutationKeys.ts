/**
 * @fileoverview Defines mutation keys for ticket reservation operations.
 */

import {buildQueryKey} from "@/common/_feat";

/** Mutation keys for the ticket reservation domain. */
export const ReserveTicketMutationKeys = buildQueryKey(
    ["reservations", "tickets"],
    {reserve: ["reserve"]},
)