/**
 * @fileoverview API repository functions for executing administrative user suspension patches.
 */

import {ManageUserSuspensionConfig} from "@/domains/users/_feat/manage-user-suspension/repository/repository.types.ts";
import {FetchRequestReturns} from "@/common/_types";
import {buildURL, useFetchAPI} from "@/common/_feat";
import {ManageUserSuspensionBaseURL} from "@/domains/users/_feat/manage-user-suspension/repository/baseURL.ts";
import {UpdateUserSuspensionReturns} from "@/domains/users/_feat/manage-user-suspension/schema";

/**
 * Sends a network request to suspend a specific user account.
 */
export async function patchSuspendUser(
    {userId, data}: ManageUserSuspensionConfig
): Promise<FetchRequestReturns<UpdateUserSuspensionReturns>> {
    const url = buildURL({
        baseURL: ManageUserSuspensionBaseURL,
        path: `/user/${userId}/suspend`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}

/**
 * Sends a network request to unsuspend a specific user account.
 */
export async function patchUnsuspendUser(
    {userId, data}: ManageUserSuspensionConfig
): Promise<FetchRequestReturns<UpdateUserSuspensionReturns>> {
    const url = buildURL({
        baseURL: ManageUserSuspensionBaseURL,
        path: `/user/${userId}/unsuspend`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}