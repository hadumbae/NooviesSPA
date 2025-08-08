import {useSearchParams} from "react-router-dom";

/** Type for React Router's `setSearchParams` function. */
type SetSearchParams = ReturnType<typeof useSearchParams>[1];

/**
 * Strongly typed pagination parameter values.
 */
export type PaginationParamValues = {
    /**
     * Current page number.
     * Typically starts from `1` in UI contexts.
     */
    page: number;

    /**
     * Number of items displayed per page.
     * Often a small set of allowed values (e.g., `10`, `20`, `50`).
     */
    perPage: number;
};

/**
 * Return type for the `usePaginationSearchParams` hook.
 *
 * This describes all values and utilities provided by the hook.
 */
export type UsePaginationSearchParamsReturn = {
    /**
     * Current resolved `page` value.
     * - Comes from URL search params if valid.
     * - Falls back to the preset values or defaults.
     */
    page: number;

    /**
     * Current resolved `perPage` value.
     * - Comes from URL search params if valid.
     * - Falls back to the preset values or defaults.
     */
    perPage: number;

    /**
     * Updates the `page` parameter in the URL search string.
     * Other existing parameters remain unchanged.
     *
     * @param newPage The new page number (numeric or string form).
     */
    setPage: (newPage: number | string) => void;

    /**
     * Updates the `perPage` parameter in the URL search string.
     * Other existing parameters remain unchanged.
     *
     * @param newPerPage The new per-page value (numeric or string form).
     */
    setPerPage: (newPerPage: number | string) => void;

    /**
     * The current URL search parameters object.
     * Reflects all query parameters from the URL.
     */
    searchParams: URLSearchParams;

    /**
     * Function to replace the current search params with new ones.
     * Provided directly from React Router's `useSearchParams`.
     */
    setSearchParams: SetSearchParams;

    /**
     * `true` if at least one pagination parameter (`page` or `perPage`)
     * exists in the current URL.
     */
    hasAnyParam: boolean;

    /**
     * `true` if both `page` and `perPage` values in the URL pass schema validation.
     */
    hasValidParams: boolean;
};