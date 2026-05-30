/**
 * @fileoverview Mutation keys for updating client reservations.
 */

import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Mutation keys for reservation checkout and cancellation operations. */
export const UpdateClientReservationMutationKeys = buildQueryKey(
    ["reservations", "tickets"],
    {checkout: ["checkout"], cancel: ["cancel"]}
);