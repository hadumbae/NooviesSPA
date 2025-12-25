import {useSearchParams} from "react-router-dom";
import updateSearchParams from "@/common/utility/features/search-params/updateSearchParams.ts";
import getPaginationDefaults from "@/common/utility/defaults/getPaginationDefaults.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import {PaginationValueSchema} from "@/common/schema/features/pagination-search-params/PaginationValueSchema.ts";

/**
 * Return shape for {@link useParsedPaginationValue}.
 */
type PaginationValueReturn = {
    /** Resolved and validated pagination value. */
    value: number;

    /** Updates the pagination value in the URL search params. */
    setValue: (val: number | string) => void;

    /** Whether the value was explicitly present in the URL. */
    hasValue: boolean;
};

/**
 * Parsed pagination search-param hook.
 *
 * @remarks
 * Reads and normalizes a single pagination-related search parameter
 * (`page` or `perPage`) from the URL.
 *
 * Behavior:
 * - Resolves the value using URL → fallback → default precedence
 * - Validates the result via {@link PaginationValueSchema}
 * - Persists updates back into the URL search params
 *
 * Throws if the resolved value fails schema validation.
 *
 * @param key - Pagination parameter to manage (`page` or `perPage`)
 * @param fallbackValue - Optional fallback when the parameter is missing or empty
 *
 * @returns Parsed pagination value, setter, and presence indicator
 *
 * @example
 * ```ts
 * const { value: page, setValue, hasValue } =
 *   useParsedPaginationValue("page");
 * ```
 */
export default function useParsedPaginationValue(
    key: "page" | "perPage",
    fallbackValue?: number,
): PaginationValueReturn {
    const [searchParams, setSearchParams] = useSearchParams();

    const defaultValue = getPaginationDefaults()[key];
    const searchValue = searchParams.get(key);

    const raw = {value: getDefaultValue(searchValue, fallbackValue, defaultValue)};
    const {data, success, error} = PaginationValueSchema.safeParse(raw);

    if (!success || error) {
        Logger.error({
            type: "ERROR",
            error,
            msg: "Invalid pagination search params.",
            context: {raw},
        });

        throw new Error("Invalid pagination search params.");
    }

    const setValue = (val: number | string) => {
        setSearchParams(
            updateSearchParams({
                searchParams,
                updateValues: {[key]: val.toString()},
            }),
        );
    };

    return {
        value: data.value,
        setValue,
        hasValue: searchValue !== null,
    };
}
