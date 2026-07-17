/**
 * @fileoverview Utility for persisting the current navigation path for post-authentication redirection.
 */

/** Persists the provided URL's path, search, and hash to session storage. */
export function setRedirectPath(url: URL): string {
    const {pathname, search, hash} = url;
    const path = `${pathname}${search}${hash}`;

    sessionStorage.setItem("redirectPath", path);

    return path;
}
