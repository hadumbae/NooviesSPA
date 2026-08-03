/**
 * @fileoverview API repository functions for executing administrative user role patches.
 */

import {FetchRequestReturns} from "@/common/_types";
import {buildURL, useFetchAPI} from "@/common/_feat";
import {UpdateUserAdminRoleReturns} from "@/domains/users/_feat/manage-user-roles/manage-admin-role";
import {ManageUserRolesBaseURL} from "@/domains/users/_feat/manage-user-roles/repository/baseURL.ts";
import {ManageUserAdminRoleConfig} from "@/domains/users/_feat/manage-user-roles/repository/repository.types.ts";

/**
 * Sends a network request to grant administrative privileges to a specific user.
 */
export async function patchGrantUserAdminRole(
    {userId, data}: ManageUserAdminRoleConfig
): Promise<FetchRequestReturns<UpdateUserAdminRoleReturns>> {
    const url = buildURL({
        baseURL: ManageUserRolesBaseURL,
        path: `/user/${userId}/role/admin/grant`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}

/**
 * Sends a network request to revoke administrative privileges from a specific user.
 */
export async function patchRevokeUserAdminRole(
    {userId, data}: ManageUserAdminRoleConfig
): Promise<FetchRequestReturns<UpdateUserAdminRoleReturns>> {
    const url = buildURL({
        baseURL: ManageUserRolesBaseURL,
        path: `/user/${userId}/role/admin/revoke`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}