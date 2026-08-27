/**
 * @fileoverview Mutation hook for checking out client reservation tickets.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/_schemas";
import {patchCheckoutTicket} from "@/domains/reservations/_feat/update-client-reservations/repositories";
import {
    UpdateClientReservationMutationKeys
} from "@/domains/reservations/_feat/update-client-reservations/mutations/mutationKeys.ts";
import {CurrentUserReservationQueryKeys, ReservationCRUDQueryKeys} from "@/domains/reservations";

/**
 * Provides a mutation for checking out a ticket by its ID.
 */
export function useCheckoutClientReservationMutation(): UseMutationResult<void, unknown, ObjectId> {
    const queryClient = useQueryClient();

    const checkout = async (_id: ObjectId) => {
        await patchCheckoutTicket(_id);
    }

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: CurrentUserReservationQueryKeys.all, exact: false});
        queryClient.invalidateQueries({queryKey: ReservationCRUDQueryKeys.all, exact: false});
    }

    return useMutation({
        mutationKey: UpdateClientReservationMutationKeys.checkout(),
        mutationFn: checkout,
        onSuccess,
    });
}
