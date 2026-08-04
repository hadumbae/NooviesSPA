/**
 * @fileoverview Custom React Hook providing a mutation for unsuspending a specific user account.
 */

import {ObjectId} from "@/common/_schemas";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ManageUserSuspensionMutationKeys} from "@/domains/users/_feat/manage-user-suspension/keys";
import {patchUnsuspendUser} from "@/domains/users/_feat/manage-user-suspension/repository";
import {
    UpdateUserSuspensionFormData,
    UpdateUserSuspensionReturns
} from "@/domains/users/_feat/manage-user-suspension/schema";

/** Configuration parameters required for the user unsuspension mutation. */
export type UseUnsuspendUserConfig = {
    userId: ObjectId;
};

/**
 * Returns a React Query mutation object for unsuspending a user account by their unique identifier.
 */
export function useUnsuspendUser(
    {userId}: UseUnsuspendUserConfig
): UseMutationResult<UpdateUserSuspensionReturns, unknown, UpdateUserSuspensionFormData> {
    const suspendUser = async (data: UpdateUserSuspensionFormData) => {
        const {result} = await patchUnsuspendUser({userId, data});
        return result;
    }

    return useMutation({
        mutationKey: ManageUserSuspensionMutationKeys.unsuspend({userId}),
        mutationFn: suspendUser,
    })
}