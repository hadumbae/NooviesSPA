/**
 * @fileoverview Utility for retrieving and clearing the stored post-login redirect path.
 */

/** Retrieves the redirect path from session storage and removes it. */
export function clearRedirectPath(): string | null {
    const path = sessionStorage.getItem("redirectPath");
    if (path) sessionStorage.removeItem("redirectPath");

    return path;
}