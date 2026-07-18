/**
 * @fileoverview Repository for user password update operations.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import type {PasswordUpdateData} from "@/domains/users/_feat/update-password/repository/repository.types.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import {UpdateUserPasswordBaseURL} from "@/domains/users/_feat/update-password/repository/baseURL";

/** Sends a PATCH request to update a specific user's password. */
export function updateUserPassword(
    {userID, data}: PasswordUpdateData
): Promise<FetchRequestReturns> {
    const url = buildURL({
        baseURL: UpdateUserPasswordBaseURL,
        path: `/update/${userID}/password`,
    });

    return useFetchAPI({url, method: "PATCH", data});
}
