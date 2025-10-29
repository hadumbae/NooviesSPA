import { useLocation } from "react-router-dom";
import { PaginationSearchParamSchema } from "@/common/schema/features/pagination-search-params/PaginationSearchParamsSchema.ts";

/** Default page number from environment variables. */
const DEFAULT_PAGE = import.meta.env.VITE_PAGINATION_PAGE_DEFAULT;

/** Default number of items per page from environment variables. */
const DEFAULT_PER_PAGE = import.meta.env.VITE_PAGINATION_PER_PAGE_DEFAULT;

/**
 * Pagination data returned from the hook.
 */
type PaginationData = {
    /** Current page number. Defaults to `DEFAULT_PAGE` if not provided. */
    page: number;
    /** Number of items per page. Defaults to `DEFAULT_PER_PAGE` if not provided. */
    perPage: number;
};

/**
 * Return type of `usePaginationLocationState`.
 *
 * @remarks
 * - On success: `{ success: true, data: PaginationData }`
 * - On failure: `{ success?: false, data: null }`
 */
type PaginationReturns =
    | { success: true; data: PaginationData }
    | { success?: false; data: null };

/**
 * React hook to extract and validate pagination state from `useLocation`.
 *
 * @remarks
 * - Uses `PaginationSearchParamSchema` to validate the state object from the current location.
 * - Applies defaults from environment variables if `page` or `perPage` are missing or undefined.
 * - Returns a strongly-typed object indicating success or failure.
 *
 * @example
 * ```ts
 * const { success, data } = usePaginationLocationState();
 * if (success) {
 *   console.log(data.page, data.perPage);
 * }
 * ```
 *
 * @returns An object containing:
 *   - `success`: Whether parsing was successful.
 *   - `data`: Validated pagination data with defaults, or `null` if validation failed.
 */
export default function usePaginationLocationState(): PaginationReturns {
    const { state } = useLocation();
    const { data, success } = PaginationSearchParamSchema.safeParse(state);

    if (success) {
        const { page = DEFAULT_PAGE, perPage = DEFAULT_PER_PAGE } = data;

        return {
            success: true,
            data: { page, perPage },
        };
    }

    return { success, data: null };
}
