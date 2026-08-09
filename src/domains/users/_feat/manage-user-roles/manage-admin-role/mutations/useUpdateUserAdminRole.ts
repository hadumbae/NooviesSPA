/**
 * @fileoverview React Hook for managing user admin role update mutations using React Query.
 */

import {ObjectId} from "@/common/_schemas";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {patchUpdateUserAdminRole} from "@/domains/users/_feat/manage-user-roles/repository";
import {UpdateAdminStatusMutationKeys} from "@/domains/users/_feat/manage-user-roles/manage-admin-role/keys";
import {
    UpdateUserAdminRoleFormData,
    UpdateUserAdminRoleReturns
} from "@/domains/users/_feat/manage-user-roles/manage-admin-role/schema";

/** Configuration options for the useUpdateUserAdminRole mutation hook. */
export type UseUpdateUserAdminRoleMutationConfig = {
    userId: ObjectId;
}

/**
 * Custom React Query hook for executing the user admin role update mutation.
 */
export function useUpdateUserAdminRole(
    {userId}: UseUpdateUserAdminRoleMutationConfig
): UseMutationResult<UpdateUserAdminRoleReturns, unknown, UpdateUserAdminRoleFormData> {
    const submitData = async (data: UpdateUserAdminRoleFormData) => {
        const {result} = await patchUpdateUserAdminRole({userId, data});
        return result;
    }

    return useMutation({
        mutationKey: UpdateAdminStatusMutationKeys.update({userId}),
        mutationFn: submitData,
    });
}