/**
 * @fileoverview Hook for deleting a single seat entity with automatic cache invalidation and notifications.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/_schemas";

import {destroy} from "@/domains/seats/_feat/crud";
import {SeatCRUDMutationKeys, SeatCRUDQueryKeys} from "@/domains/seats/_feat/crud-hooks/keys";

type DeleteValue = {
    _id: ObjectId;
};

/**
 * Executes a seat deletion mutation and synchronizes the local cache by invalidating seat lists.
 */
export function useSeatDeleteMutation(): UseMutationResult<void, unknown, DeleteValue> {
    const queryClient = useQueryClient();

    const deleteSeat = async ({_id}: DeleteValue) => {
        await destroy({_id})
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: SeatCRUDQueryKeys.list(), exact: false});
    };

    return useMutation({
        mutationKey: SeatCRUDMutationKeys.deleteSingle(),
        mutationFn: deleteSeat,
        onSuccess,
    });
}