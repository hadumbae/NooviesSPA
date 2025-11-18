import {useSearchParams} from "react-router-dom";
import updateSearchParams from "@/common/utility/features/search-params/updateSearchParams.ts";
import {
    PaginationValues,
    PaginationValuesSchema
} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import getPaginationDefaults from "@/common/utility/defaults/getPaginationDefaults.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";

type UsePaginationSearchParamsReturn = {
    /** Current page number from URL or defaults. */
    page: number;

    /** Current number of items per page from URL or defaults. */
    perPage: number;

    /** Setter to update the page number in URL search params. */
    setPage: (newPage: number | string) => void;

    /** Setter to update the per-page number in URL search params. */
    setPerPage: (newPerPage: number | string) => void;

    /** Indicates whether the URL currently contains `page` and `perPage` search parameters. */
    hasPaginationValues: boolean;
};

/**
 * Custom React hook to manage pagination state via URL search parameters.
 *
 * ## Overview
 * This hook provides type-safe access to pagination values (`page` and `perPage`)
 * from the URL search params. It falls back to default values if parameters are missing
 * and supports optional preset values.
 *
 * ### Behavior
 * - Reads `page` and `perPage` from the URL search parameters.
 * - Falls back to `presetValues` if provided, or defaults from {@link getPaginationDefaults}.
 * - Validates values using {@link PaginationValuesSchema}.
 * - Provides setters (`setPage` and `setPerPage`) that automatically update the URL search parameters.
 * - Throws an error if invalid pagination values are detected.
 *
 * @param presetValues - Optional object containing preset `page` and `perPage` values.
 *
 * @returns An object containing:
 * - `page` – The current page number.
 * - `perPage` – The current number of items per page.
 * - `setPage(newPage)` – Function to update the page number in the URL.
 * - `setPerPage(newPerPage)` – Function to update the per-page number in the URL.
 * - `hasPaginationValues` – Boolean indicating if the URL contains both `page` and `perPage`.
 *
 * @example
 * ```ts
 * const { page, perPage, setPage, setPerPage } = usePaginationSearchParams();
 *
 * console.log(page, perPage);
 * setPage(2);
 * setPerPage(50);
 * ```
 *
 * @remarks
 * - Ensure `.env` contains valid default pagination values via `VITE_PAGINATION_PAGE_DEFAULT` and
 *   `VITE_PAGINATION_PER_PAGE_DEFAULT`.
 * - This hook automatically logs invalid URL parameters via {@link Logger} before throwing.
 */
export default function usePaginationSearchParams(presetValues?: PaginationValues): UsePaginationSearchParamsReturn {
    // ⚡ State ⚡

    const [searchParams, setSearchParams] = useSearchParams();
    const defaultValues = getPaginationDefaults();

    // ⚡ Has Relevant Values ⚡

    const hasPaginationValues = searchParams.get("page") !== null && searchParams.get("perPage") !== null;

    // ⚡ Get Values ⚡

    const raw = {
        page: getDefaultValue(presetValues?.page, searchParams.get("page"), defaultValues.page),
        perPage: getDefaultValue(presetValues?.perPage, searchParams.get("perPage"), defaultValues.perPage),
    };

    // ⚡ Parse Values ⚡

    const {data, success, error} = PaginationValuesSchema.safeParse(raw);

    if (!success || error) {
        Logger.error({
            type: "ERROR",
            error,
            msg: "Invalid pagination search params. Please try again.",
            context: {raw}
        });

        throw Error("Invalid pagination search params.");
    }

    const {page, perPage} = data;

    // ⚡ Handler

    const setParam = (key: keyof PaginationValues, value: number | string) => {
        setSearchParams(updateSearchParams({searchParams, updateValues: {[key]: value.toString()}}));
    }

    return {
        page,
        perPage,
        setPage: (newPage: number | string) => setParam("page", newPage),
        setPerPage: (newPerPage: number | string) => setParam("perPage", newPerPage),
        hasPaginationValues,
    }
}
