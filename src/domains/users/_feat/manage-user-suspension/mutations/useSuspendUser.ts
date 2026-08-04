/**
 * @fileoverview Custom React Hook providing a mutation for suspending a specific user account.
 */

import {ObjectId} from "@/common/_schemas";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ManageUserSuspensionMutationKeys} from "@/domains/users/_feat/manage-user-suspension/keys";
import {patchSuspendUser} from "@/domains/users/_feat/manage-user-suspension/repository";
import {
    UpdateUserSuspensionFormData,
    UpdateUserSuspensionReturns
} from "@/domains/users/_feat/manage-user-suspension/schema";

/** Configuration parameters required for the user suspension mutation. */
export type UseSuspendUserConfig = {
    userId: ObjectId;
};

/**
 * Returns a React Query mutation object for suspending a user account by their unique identifier.
 */
export function useSuspendUser(
    {userId}: UseSuspendUserConfig
): UseMutationResult<UpdateUserSuspensionReturns, unknown, UpdateUserSuspensionFormData> {
    const suspendUser = async (data: UpdateUserSuspensionFormData) => {
        const {result} = await patchSuspendUser({userId, data});
        return result;
    }

    return useMutation({
        mutationKey: ManageUserSuspensionMutationKeys.suspend({userId}),
        mutationFn: suspendUser,
    })
}