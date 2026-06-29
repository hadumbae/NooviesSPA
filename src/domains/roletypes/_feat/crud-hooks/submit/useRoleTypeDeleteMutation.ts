/**
 * @fileoverview Mutation hook for deleting RoleType entities.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {destroy, RoleTypeCRUDMutationKeys, RoleTypeCRUDQueryKeys} from "@/domains/roletypes/_feat";

/** Input parameters for the RoleType deletion mutation. */
type DeletePrompt = {
    _id: ObjectId
};

/** Provides a mutation function for deleting a RoleType and handles cache invalidation. */
export function useRoleTypeDeleteMutation(): UseMutationResult<void, unknown, DeletePrompt> {
    const queryClient = useQueryClient();

    const deleteRoleType = async ({_id}: DeletePrompt) => {
        await destroy({_id});
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: RoleTypeCRUDQueryKeys.list(), exact: false});
    };

    return useMutation({
        mutationKey: RoleTypeCRUDMutationKeys.deleteSingle(),
        mutationFn: deleteRoleType,
        onSuccess,
    });
}
