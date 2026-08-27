/**
 * @fileoverview Mutation hook for cancelling an existing reservation ticket.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/_schemas";
import {
    CurrentUserReservationQueryKeys,
    patchCancelClientReservation, ReservationCRUDQueryKeys,
    UpdateClientReservationMutationKeys
} from "@/domains/reservations";

/**
 * Hook providing a mutation to cancel a reservation by its unique identifier.
 */
export function useCancelClientReservationMutation(): UseMutationResult<void, unknown, ObjectId> {
    const queryClient = useQueryClient();

    const cancel = async (_id: ObjectId) => {
        await patchCancelClientReservation(_id);
    }

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: CurrentUserReservationQueryKeys.all, exact: false});
        queryClient.invalidateQueries({queryKey: ReservationCRUDQueryKeys.all, exact: false});
    }

    return useMutation({
        mutationKey: UpdateClientReservationMutationKeys.cancel(),
        mutationFn: cancel,
        onSuccess,
    });
}
