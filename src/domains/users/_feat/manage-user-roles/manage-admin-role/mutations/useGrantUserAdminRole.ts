/**
 * @fileoverview Custom React Hook providing a mutation for granting administrative privileges to a user.
 */

import {ObjectId} from "@/common/_schemas";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {patchGrantUserAdminRole} from "@/domains/users/_feat/manage-user-roles/repository";
import {UpdateAdminStatusMutationKeys} from "@/domains/users/_feat/manage-user-roles/manage-admin-role/keys";
import {
    UpdateUserAdminRoleFormData,
    UpdateUserAdminRoleReturns
} from "@/domains/users/_feat/manage-user-roles/manage-admin-role/schema";

/** Configuration parameters required for the grant administrative role mutation. */
export type UseGrantUserAdminRoleMutationConfig = {
    userId: ObjectId;
}

/**
 * Returns a React Query mutation object for granting administrative privileges to a specific user.
 */
export function useGrantUserAdminRole(
    {userId}: UseGrantUserAdminRoleMutationConfig
): UseMutationResult<UpdateUserAdminRoleReturns, unknown, UpdateUserAdminRoleFormData> {
    const submitData = async (data: UpdateUserAdminRoleFormData) => {
        const {result} = await patchGrantUserAdminRole({userId, data});
        return result;
    }

    return useMutation({
        mutationKey: UpdateAdminStatusMutationKeys.grant(),
        mutationFn: submitData,
    });
}