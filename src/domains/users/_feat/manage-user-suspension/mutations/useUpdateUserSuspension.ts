/**
 * @fileoverview React Query mutation hook for executing user suspension updates.
 */

import {ObjectId} from "@/common/_schemas";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ManageUserSuspensionMutationKeys} from "@/domains/users/_feat/manage-user-suspension/keys";
import {patchUpdateUserSuspension} from "@/domains/users/_feat/manage-user-suspension/repository";
import {
    UpdateUserSuspensionFormData,
    UpdateUserSuspensionReturns
} from "@/domains/users/_feat/manage-user-suspension/schema";

/** Configuration options for the useUpdateUserSuspension mutation hook. */
export type UseUpdateUserSuspensionConfig = {
    userId: ObjectId;
};

/**
 * Custom React Query hook for suspending a user account.
 */
export function useUpdateUserSuspension(
    {userId}: UseUpdateUserSuspensionConfig
): UseMutationResult<UpdateUserSuspensionReturns, unknown, UpdateUserSuspensionFormData> {
    const suspendUser = async (data: UpdateUserSuspensionFormData) => {
        const {result} = await patchUpdateUserSuspension({userId, data});
        return result;
    }

    return useMutation({
        mutationKey: ManageUserSuspensionMutationKeys.update({userId}),
        mutationFn: suspendUser,
    })
}