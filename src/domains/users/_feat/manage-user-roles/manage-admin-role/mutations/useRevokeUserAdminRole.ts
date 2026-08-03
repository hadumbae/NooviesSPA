/**
 * @fileoverview Custom React Hook providing a mutation for revoking administrative privileges from a user.
 */

import {ObjectId} from "@/common/_schemas";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {patchRevokeUserAdminRole} from "@/domains/users/_feat/manage-user-roles/repository";
import {UpdateAdminStatusMutationKeys} from "@/domains/users/_feat/manage-user-roles/manage-admin-role/keys";
import {
    UpdateUserAdminRoleFormData,
    UpdateUserAdminRoleReturns
} from "@/domains/users/_feat/manage-user-roles/manage-admin-role/schema";

/** Configuration parameters required for the revoke administrative role mutation. */
type MutationConfig = {
    userId: ObjectId;
}

/**
 * Returns a React Query mutation object for revoking administrative privileges from a specific user.
 */
export function useRevokeUserAdminRole(
    {userId}: MutationConfig
): UseMutationResult<UpdateUserAdminRoleReturns, unknown, UpdateUserAdminRoleFormData> {
    const submitData = async (data: UpdateUserAdminRoleFormData) => {
        const {result} = await patchRevokeUserAdminRole({userId, data});
        return result;
    }

    return useMutation({
        mutationKey: UpdateAdminStatusMutationKeys.revoke(),
        mutationFn: submitData,
    });
}