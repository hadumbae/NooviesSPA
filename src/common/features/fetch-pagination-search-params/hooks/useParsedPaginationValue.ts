/**
 * @file React hook for managing a single, schema-validated pagination parameter in the URL.
 * @filename useParsedPaginationValue.ts
 */

import {useSearchParams} from "react-router-dom";
import {updateSearchParams} from "@/common/features/fetch-search-params";
import Logger from "@/common/utility/features/logger/Logger.ts";
import {PaginationValueSchema} from "@/common/features/fetch-pagination-search-params/schemas/PaginationValueSchema.ts";
import {getPaginationDefaultValue} from "@/common/features/fetch-pagination-search-params";

/**
 * Structured return object for the {@link useParsedPaginationValue} hook.
 */
type PaginationValueReturn = {
    /** The validated and coerced numeric value (e.g., the current page number). */
    value: number;

    /** * Updates the specific parameter in the browser's URL.
     * @param val - The new numeric or string value to persist.
     */
    setValue: (val: number | string) => void;

    /** Flag indicating if the parameter was explicitly defined in the URL query string. */
    hasValue: boolean;
};

/**
 * A specialized hook for handling individual pagination segments (page or perPage) with Zod validation.
 * @param key - The URL parameter key to manage ('page' or 'perPage').
 * @param fallbackValue - An optional number to use if the parameter is missing from the URL.
 * @returns An object containing the current numeric value, a setter, and a presence flag.
 * @throws {Error} If the resolved value fails to meet the schema requirements.
 */
export default function useParsedPaginationValue(
    key: "page" | "perPage",
    fallbackValue?: number,
): PaginationValueReturn {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchParamValue = searchParams.get(key);

    const raw = {
        value: searchParamValue ?? fallbackValue ?? getPaginationDefaultValue(key)
    };

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
                updateData: {[key]: val.toString()},
            }),
        );
    };

    return {
        value: data.value,
        setValue,
        hasValue: searchParamValue !== null,
    };
}