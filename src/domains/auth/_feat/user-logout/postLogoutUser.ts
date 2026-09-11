/**
 * @fileoverview Utility function for revoking user sessions via the logout API endpoint.
 */

import {buildURL} from "@/common/_feat/fetch-api/buildURL";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI";
import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns";
import {AuthBaseURL} from "@/domains/auth/_feat/common/baseURL.ts";

/** Sends a request to log out the current user and invalidate their session. */
export function postLogoutUser(): Promise<FetchRequestReturns> {
    const url = buildURL({baseURL: AuthBaseURL, path: "/logout"});
    return useFetchAPI({url, method: "POST"});
}