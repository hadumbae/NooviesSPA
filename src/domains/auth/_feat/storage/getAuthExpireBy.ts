/**
 * @fileoverview Utility function for retrieving the authenticated session expiration timestamp from local storage.
 */

import {DateTime} from "luxon";

/** Retrieves and parses the authentication expiration timestamp from local storage, defaulting to the current time if missing or invalid. */
export function getAuthExpireBy() {
    const now = DateTime.now().setZone("UTC");
    const rawISO = localStorage.getItem("authExpireBy");

    if (!rawISO) {
        return now;
    }

    const expireBy = DateTime.fromISO(rawISO);
    return expireBy.isValid ? expireBy : now;
}
