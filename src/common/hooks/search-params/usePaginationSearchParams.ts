import {useSearchParams} from "react-router-dom";
import updateSearchParams from "@/common/utility/features/search-params/updateSearchParams.ts";
import {
    PaginationValues,
    PaginationValuesSchema
} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import getPaginationDefaults from "@/common/utility/defaults/getPaginationDefaults.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";

/**
 * Return type for {@link usePaginationSearchParams}.
 */
type UsePaginationSearchParamsReturn = {
    /** Current page number (validated). */
    page: number;

    /** Current items-per-page value (validated). */
    perPage: number;

    /** Updates the `page` URL search parameter. */
    setPage: (newPage: number | string) => void;

    /** Updates the `perPage` URL search parameter. */
    setPerPage: (newPerPage: number | string) => void;

    /** Whether both pagination parameters exist in the URL. */
    hasPaginationValues: boolean;
};

/**
 * **usePaginationSearchParams**
 *
 * URL-driven pagination state hook.
 *
 * Reads, validates, and updates `page` and `perPage`
 * values from URL search parameters.
 *
 * ## Source of Truth
 * - URL search params are authoritative
 * - Fallback values are used only when params are missing
 *
 * ## Guarantees
 * - Returned values always conform to {@link PaginationValuesSchema}
 * - Invalid params are logged and rejected early
 *
 * @param fallbackValues - Initial pagination values used only if URL params are absent
 *
 * @throws Error if pagination values fail schema validation
 *
 * @example
 * ```ts
 * const { page, perPage, setPage } = usePaginationSearchParams({ page: 1, perPage: 25 });
 *
 * setPage(2);
 * ```
 */
export default function usePaginationSearchParams(
    fallbackValues?: PaginationValues
): UsePaginationSearchParamsReturn {
    // --- STATE ---
    const [searchParams, setSearchParams] = useSearchParams();

    const defaultValues = getPaginationDefaults();
    const paramValues = {
        page: searchParams.get("page"),
        perPage: searchParams.get("perPage"),
    };

    // --- PRESENCE ---
    const hasPaginationValues =
        paramValues.page !== null &&
        paramValues.perPage !== null;

    // --- RAW VALUES ---
    const raw = {
        page: getDefaultValue(
            paramValues.page,
            fallbackValues?.page,
            defaultValues.page
        ),
        perPage: getDefaultValue(
            paramValues.perPage,
            fallbackValues?.perPage,
            defaultValues.perPage
        ),
    };

    // --- VALIDATION ---
    const {data, success, error} = PaginationValuesSchema.safeParse(raw);

    if (!success || error) {
        Logger.error({
            type: "ERROR",
            error,
            msg: "Invalid pagination search params.",
            context: {raw},
        });

        throw new Error("Invalid pagination search params.");
    }

    const {page, perPage} = data;

    // --- SETTERS ---
    const setParam = (key: keyof PaginationValues, value: number | string) => {
        setSearchParams(
            updateSearchParams({
                searchParams,
                updateValues: {[key]: value.toString()},
            })
        );
    };

    return {
        page,
        perPage,
        setPage: (newPage) => setParam("page", newPage),
        setPerPage: (newPerPage) => setParam("perPage", newPerPage),
        hasPaginationValues,
    };
}
