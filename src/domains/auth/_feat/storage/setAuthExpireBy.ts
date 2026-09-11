/**
 * @fileoverview Utility function for setting and persisting the authentication expiration timestamp.
 */

import {DateTime} from "luxon";

/** Persists the authentication expiration timestamp to local storage. */
export function setAuthExpireBy(expireBy: DateTime) {
    const dateString = expireBy.isValid ? expireBy.toISO()! : DateTime.now().toISO();
    localStorage.setItem("authExpireBy", dateString);
}
