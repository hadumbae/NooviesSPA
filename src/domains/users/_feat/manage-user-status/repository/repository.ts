/**
 * @fileoverview API repository function for sending HTTP PATCH requests to update a user's status.
 */

import {UpdateUserStatusConfig} from "@/domains/users/_feat/manage-user-status/repository/repository.types.ts";
import {FetchRequestReturns} from "@/common/_types";
import {UpdateUserStatusReturns} from "@/domains/users/_feat/manage-user-status/schema";
import {buildURL, useFetchAPI} from "@/common/_feat";
import {ManageUserStatusBaseURL} from "@/domains/users/_feat/manage-user-status/repository/baseURL.ts";

/**
 * Sends a PATCH request to update the status of a specific user.
 */
export function patchUpdateUserStatus(
    {userId, data}: UpdateUserStatusConfig
): Promise<FetchRequestReturns<UpdateUserStatusReturns>> {
    const url = buildURL({
        baseURL: ManageUserStatusBaseURL,
        path: `/user/${userId}/status/update`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}