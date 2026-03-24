/**
 * @file React hook for managing URL-driven pagination state with Zod validation.
 * @filename usePaginationSearchParams.ts
 */

import {useSearchParams} from "react-router-dom";
import {updateSearchParams} from "@/common/features/fetch-search-params";
import {
    PaginationValues,
    PaginationValuesSchema
} from "@/common/features/fetch-pagination-search-params/schemas/PaginationValuesSchema.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import {getPaginationDefaultValue} from "@/common/features/fetch-pagination-search-params/getPaginationDefaultValue.ts";

/**
 * The structured return object for the {@link usePaginationSearchParams} hook.
 */
type UsePaginationSearchParamsReturn = {
    /** The validated current page number, coerced from the URL or fallback. */
    page: number;

    /** The validated items-per-page count, coerced from the URL or fallback. */
    perPage: number;

    /**
     * Updates the `page` parameter in the URL.
     * @param newPage - The numeric or string value for the next page.
     */
    setPage: (newPage: number | string) => void;

    /**
     * Updates the `perPage` parameter in the URL.
     * @param newPerPage - The numeric or string value for the items per page.
     */
    setPerPage: (newPerPage: number | string) => void;

    /**
     * Flag indicating if both `page` and `perPage` are explicitly present in the current URL.
     * Useful for determining if a "default" state is currently active.
     */
    hasPaginationValues: boolean;
};

/**
 * A hook that synchronizes pagination state directly with the browser's URL search parameters.
 * @param fallbackValues - Optional overrides used when the URL parameters are absent.
 * @returns An object containing validated state and setter functions.
 * @throws {Error} If the combined parameters fail Zod validation.
 */
export default function usePaginationSearchParams(
    fallbackValues?: PaginationValues
): UsePaginationSearchParamsReturn {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchParamValues = {
        page: searchParams.get("page"),
        perPage: searchParams.get("perPage"),
    };

    const hasPaginationValues =
        searchParamValues.page !== null &&
        searchParamValues.perPage !== null;

    const rawValues = {
        page: searchParamValues.page ??
            fallbackValues?.page ??
            getPaginationDefaultValue("page"),

        perPage: searchParamValues.perPage ??
            fallbackValues?.perPage ??
            getPaginationDefaultValue("perPage"),
    }

    const {data, success, error} = PaginationValuesSchema.safeParse(rawValues);

    if (!success || error) {
        Logger.error({
            type: "ERROR",
            error,
            msg: "Invalid pagination search params.",
            context: {raw: rawValues},
        });

        throw new Error("Invalid pagination search params.");
    }

    const setParam = (key: keyof PaginationValues, value: number | string) => {
        setSearchParams(
            updateSearchParams({
                searchParams,
                updateData: {[key]: value.toString()},
            })
        );
    };

    return {
        ...data,
        setPage: (newPage) => setParam("page", newPage),
        setPerPage: (newPerPage) => setParam("perPage", newPerPage),
        hasPaginationValues,
    };
}