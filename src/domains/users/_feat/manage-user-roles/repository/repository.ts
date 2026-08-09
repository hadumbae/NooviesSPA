/**
 * @fileoverview Repository functions for sending HTTP requests to manage user administrative roles.
 */

import {FetchRequestReturns} from "@/common/_types";
import {buildURL, useFetchAPI} from "@/common/_feat";
import {UpdateUserAdminRoleReturns} from "@/domains/users/_feat/manage-user-roles/manage-admin-role";
import {ManageUserRolesBaseURL} from "@/domains/users/_feat/manage-user-roles/repository/baseURL.ts";
import {ManageUserAdminRoleConfig} from "@/domains/users/_feat/manage-user-roles/repository/repository.types.ts";

/**
 * Sends an HTTP PATCH request to update a user's administrative roles.
 */
export async function patchUpdateUserAdminRole(
    {userId, data}: ManageUserAdminRoleConfig
): Promise<FetchRequestReturns<UpdateUserAdminRoleReturns>> {
    const url = buildURL({
        baseURL: ManageUserRolesBaseURL,
        path: `/user/${userId}/role/admin/update`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}