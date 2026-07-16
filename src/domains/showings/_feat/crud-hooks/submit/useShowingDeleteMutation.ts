/**
 * @fileoverview Hook for managing the deletion mutation of showing records.
 */

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/_schemas";

import {destroy} from "@/domains/showings/_feat/crud";
import {ShowingBaseQueryKeys} from "@/domains/showings/_feat/base-query-keys";
import {ShowingCRUDMutationKeys} from "@/domains/showings/_feat/crud-hooks/keys";

/** Custom mutation hook to delete a showing and invalidate related cache keys. */
export function useShowingDeleteMutation() {
    const queryClient = useQueryClient();

    const deleteShowing = async ({_id}: { _id: ObjectId }) => {
        await destroy({_id});
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: ShowingBaseQueryKeys.views, exact: false});
        queryClient.invalidateQueries({queryKey: ShowingBaseQueryKeys.crudList, exact: false});
    };

    return useMutation({
        mutationKey: ShowingCRUDMutationKeys.deleteSingle(),
        mutationFn: deleteShowing,
        onSuccess,
    });
}
