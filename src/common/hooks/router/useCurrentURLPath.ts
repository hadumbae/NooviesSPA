import { useLocation } from "react-router-dom";

/**
 * **useCurrentURLPath** — a React hook that returns the full current URL path,
 * including pathname, search query, and hash fragment.
 *
 * This is useful for components that need to determine route activity
 * (e.g., highlighting active navigation links or dropdown items).
 *
 * ### Example
 * ```tsx
 * const currentPath = useCurrentURLPath();
 * console.log(currentPath);
 * // Output: "/dashboard?page=2#section"
 * ```
 *
 * @returns The current browser URL path as a single string,
 * formatted as `pathname + search + hash`.
 *
 * @remarks
 * - Requires a `react-router-dom` `<Router>` context.
 * - For example, if `window.location` is `/users?id=123#details`,
 *   this hook will return `"/users?id=123#details"`.
 */
export default function useCurrentURLPath(): string {
    const location = useLocation();
    const { pathname, search, hash } = location;

    return `${pathname}${search}${hash}`;
}
