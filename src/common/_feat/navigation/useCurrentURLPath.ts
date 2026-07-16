/**
 * @fileoverview Hook for retrieving the full current URL path including search and hash.
 */

import { useLocation } from "react-router-dom";

/**
 * Returns the current pathname, search, and hash as a single string.
 */
export function useCurrentURLPath(): string {
    const location = useLocation();
    const {pathname, search, hash} = location;

    return `${pathname}${search}${hash}`;
}
