import {useSearchParams} from "react-router-dom";
import {paginationSearchParamSchema} from "@/common/schema/PaginationSearchParamsSchema.ts";
import updateSearchParams from "@/common/utility/params/updateSearchParams.ts";
import {
    PaginationParamValues,
    UsePaginationSearchParamsReturn
} from "@/common/hooks/params/usePaginationSearchParams.types.ts";

/**
 * Default pagination values used when no valid search parameters are found.
 */
const DEFAULT_VALUES: PaginationParamValues = { page: 1, perPage: 10 };

/**
 * React hook for reading, validating, and updating pagination parameters (`page` and `perPage`)
 * from the URL search parameters.
 *
 * ### Behavior
 * - Reads the current `page` and `perPage` values from `window.location.search`.
 * - Validates the values against a Zod schema (`paginationSearchParamSchema`).
 * - Returns validated values or falls back to provided `presetValues` / defaults.
 * - Provides setter functions for updating `page` or `perPage` in the URL
 *   while preserving other existing query parameters.
 *
 * ### Fallback order
 * 1. Valid values from URL search parameters
 * 2. `presetValues` passed to the hook
 * 3. Internal `DEFAULT_VALUES`
 *
 * @param presetValues Optional pagination values to use when URL parameters are missing or invalid.
 *
 * @returns {@link UsePaginationSearchParamsReturn} — An object containing the current values,
 * setters, and status flags for pagination search parameters.
 */
export default function usePaginationSearchParams(
    presetValues: PaginationParamValues = DEFAULT_VALUES
): UsePaginationSearchParamsReturn {
    const [searchParams, setSearchParams] = useSearchParams();
    const rawData = {
        page: searchParams.get("page"),
        perPage: searchParams.get("perPage")
    };

    const {data, success} = paginationSearchParamSchema.safeParse(rawData);
    const hasAnyParam = rawData.page !== null || rawData.perPage !== null;

    const {page, perPage} = success ? data : presetValues;

    const setParam = (key: keyof PaginationParamValues, value: number | string) => {
        setSearchParams(updateSearchParams({searchParams, updateValues: {[key]: value.toString()}}));
    }

    return {
        page,
        perPage,
        setPage: (newPage: number | string) => setParam("page", newPage),
        setPerPage: (newPerPage: number | string) => setParam("perPage", newPerPage),
        searchParams,
        setSearchParams,
        hasAnyParam,
        hasValidParams: success,
    }
}