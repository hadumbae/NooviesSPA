/**
 * @fileoverview API mutation function for registering a new user via the registration endpoint.
 */

import {buildURL} from "@/common/_feat/fetch-api/buildURL";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI";
import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns";
import {AuthBaseURL} from "@/domains/auth/_feat/common/baseURL.ts";
import {AuthRegisterForm} from "@/domains/auth/_feat/user-register/AuthRegisterFormSchema.ts";

/** Sends registration data to the authentication API to create a new user account. */
export function postRegisterUser(data: AuthRegisterForm): Promise<FetchRequestReturns> {
    const url = buildURL({baseURL: AuthBaseURL, path: "/register"});
    return useFetchAPI({url, method: "POST", data});
}
