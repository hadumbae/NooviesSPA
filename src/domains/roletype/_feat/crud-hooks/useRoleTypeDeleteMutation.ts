/**
 * @fileoverview Mutation hook for deleting RoleType entities.
 *
 */

import {toast} from "react-toastify";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import handleMutationResponseError from "@/common/utility/handlers/handleMutationResponseError.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {destroy, RoleTypeCRUDMutationKeys, RoleTypeCRUDQueryKeys} from "@/domains/roletype/_feat";
import {MutationResponseConfig} from "@/common/_feat/submit-data";

/** Input parameters for the RoleType deletion mutation. */
type DeletePrompt = {
    _id: ObjectId
};

/** Provides a mutation function for deleting a RoleType and handles cache invalidation. */
export function useRoleTypeDeleteMutation(
    onSubmitConfig: MutationResponseConfig<void, DeletePrompt>
): UseMutationResult<void, unknown, DeletePrompt> {
    const queryClient = useQueryClient();

    const deleteRoleType = async ({_id}: DeletePrompt) => {
        onSubmitConfig.submitMessage && toast.info(onSubmitConfig.submitMessage);
        onSubmitConfig.onSubmit?.({_id});

        await destroy({_id});
    };

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: RoleTypeCRUDQueryKeys.list(), exact: false});

        onSubmitConfig.successMessage && toast.success(onSubmitConfig.successMessage);
        onSubmitConfig.onSubmitSuccess?.();
    };

    const onError = (error: unknown) => {
        handleMutationResponseError({error, displayMessage: onSubmitConfig.errorMessage});
        onSubmitConfig.onSubmitError?.(error);
    };

    return useMutation({
        mutationKey: RoleTypeCRUDMutationKeys.deleteSingle(),
        mutationFn: deleteRoleType,
        onSuccess,
        onError,
    });
}
