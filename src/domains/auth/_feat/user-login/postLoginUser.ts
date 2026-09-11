/**
 * @fileoverview API mutation function for authenticating users via the login endpoint.
 */

import {buildURL} from "@/common/_feat/fetch-api/buildURL";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI";
import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns";
import {AuthBaseURL} from "@/domains/auth/_feat/common/baseURL.ts";
import {AuthLoginFormData} from "@/domains/auth/_feat/user-login/AuthLoginFormSchema.ts";

/** Sends user credentials to the authentication API to initialize a new session. */
export function postLoginUser(data: AuthLoginFormData): Promise<FetchRequestReturns> {
    const url = buildURL({baseURL: AuthBaseURL, path: "/login"});
    return useFetchAPI({url, method: "POST", data});
}
