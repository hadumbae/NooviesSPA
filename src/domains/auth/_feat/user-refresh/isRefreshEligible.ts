/**
 * @fileoverview Utility for determining whether an API request endpoint is eligible for automatic session token refreshing.
 */

import {API_URL} from "@/common/_feat/fetch-api/apiEnvValues.ts";

/** Checks if the specified request URL is eligible for token refresh operations. */
export function isRefreshEligible(url: string): boolean {
    return (
        url !== `${API_URL}/auth/login` &&
        url !== `${API_URL}/auth/refresh` &&
        url !== `${API_URL}/auth/logout`
    );
}