/**
 * @fileoverview Repository for handling authentication requests to the backend.
 */

import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {AuthBaseURL} from "@/domains/auth/_feat/access-auth-backend";
import {AuthLoginFormData} from "@/domains/auth/_feat/auth-login-fom";
import {AuthRegisterForm} from "@/domains/auth/_feat/auth-register-form";
import {buildURL} from "@/common/_feat/fetch-api";

/** Sends user registration data to the authentication backend. */
export function registerUser(data: AuthRegisterForm): Promise<RequestReturns> {
    const url = buildURL({baseURL: AuthBaseURL, path: "/register"});
    return useFetchAPI({url, method: "POST", data});
}

/** Authenticates a user with the provided login credentials. */
export function loginUser(data: AuthLoginFormData): Promise<RequestReturns> {
    const url = buildURL({baseURL: AuthBaseURL, path: "/login"});
    return useFetchAPI({url, method: "POST", data});
}

/** Terminates the current user session. */
export function logoutUser(): Promise<RequestReturns> {
    const url = buildURL({baseURL: AuthBaseURL, path: "/logout"});
    return useFetchAPI({url, method: "POST"});
}