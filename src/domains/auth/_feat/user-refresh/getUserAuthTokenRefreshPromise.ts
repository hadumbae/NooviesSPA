/**
 * @fileoverview Singleton manager for handling concurrent authentication token refresh promises.
 */

import {User} from "@/domains/users";
import {refreshUserAuthToken} from "@/domains/auth/_feat/user-refresh/refreshUserAuthToken.ts";

let refreshPromise: Promise<User> | null = null;

/** Retrieves the active token refresh promise or initializes a new one if none exists. */
export function getUserAuthTokenRefreshPromise() {
    if (!refreshPromise) {
        refreshPromise = refreshUserAuthToken().finally(() => {
            refreshPromise = null
        });
    }

    return refreshPromise;
}