/**
 * @fileoverview Mutation hook for cancelling an existing reservation ticket.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/_schemas";
import {
    CurrentUserReservationQueryKeys
} from "@/domains/reservations/_feat/fetch-current-user-reservations/keys/CurrentUserReservationQueryKeys.ts";
import {
    patchCancelClientReservation
} from "@/domains/reservations/_feat/update-client-reservations/repositories/repository.ts";
import {ReservationCRUDQueryKeys} from "@/domains/reservations/_feat/crud-hooks/queryKeys.ts";
import {
    UpdateClientReservationMutationKeys
} from "@/domains/reservations/_feat/update-client-reservations/mutations/mutationKeys.ts";

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
