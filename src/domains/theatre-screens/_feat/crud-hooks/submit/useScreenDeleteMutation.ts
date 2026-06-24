/**
 * @fileoverview React Query mutation hook for deleting a theatre screen.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

import {destroy} from "@/domains/theatre-screens/_feat/crud";
import {TheatreAdminViewDataQueryKeys} from "@/domains/theatres/_feat/admin-view-data";
import {TheatreScreenCRUDMutationKeys, TheatreScreenCRUDQueryKeys} from "@/domains/theatre-screens/_feat/crud-hooks/keys";

type DeleteValue = {
    _id: ObjectId;
}
/** React Query mutation hook for deleting a theatre screen. */
export function useScreenDeleteMutation(): UseMutationResult<void, unknown, DeleteValue> {
    const queryClient = useQueryClient();
    const deleteScreen = async ({_id}: DeleteValue) => {
        await destroy({_id});
    };
    const onSuccess = async () => {
        queryClient.invalidateQueries({queryKey: TheatreScreenCRUDQueryKeys.list(), exact: false});
        queryClient.invalidateQueries({queryKey: TheatreAdminViewDataQueryKeys.details(), exact: false});
    };

    return useMutation({
        mutationKey: TheatreScreenCRUDMutationKeys.deleteSingle(),
        mutationFn: deleteScreen,
        onSuccess,
    });
}