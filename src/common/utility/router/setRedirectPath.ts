/**
 * Stores the full URL path (pathname, search, and hash) in session storage
 * under the key `"redirectPath"` and returns it.
 *
 * @param url - The URL object to extract the path from.
 * @returns The combined pathname, search, and hash as a string.
 *
 * @example
 * ```ts
 * const redirect = setRedirectPath(new URL("https://example.com/page?query=1#section"));
 * console.log(redirect); // "/page?query=1#section"
 * ```
 */
export default function setRedirectPath(url: URL): string {
    const { pathname, search, hash } = url;
    const path = `${pathname}${search}${hash}`;

    sessionStorage.setItem("redirectPath", path);

    return path;
}
