/**
 * @file Utility for updating a single search parameter value while maintaining synchronization with the URL.
 * @filename updateSearchParamValue.ts
 */

import {NavigateOptions, URLSearchParamsInit} from "react-router-dom";
import {updateSearchParams} from "@/common/features/fetch-search-params";

/**
 * Configuration parameters for updating a single search parameter.
 */
type SetValueParams = {
    /** The key of the parameter to be updated or created. */
    key: string;
    /** * The new value to assign.
     * Supported types (via {@link updateSearchParams}): string, number, boolean, array, or object.
     */
    value: any;
    /** The current `URLSearchParams` instance from the component state or hook. */
    searchParams: URLSearchParams;
    /** * The setter function provided by React Router's `useSearchParams` hook to
     * update the browser's address bar.
     */
    setSearchParams: (
        nextInit: URLSearchParamsInit,
        navigateOptions?: NavigateOptions
    ) => void
};

/**
 * Updates a specific key in the URL search parameters and persists the change to the browser history.
 * @param params - Configuration including the key, new value, and the router's search parameter state/setter.
 */
export default function updateSearchParamValue(params: SetValueParams) {
    const {
        key,
        value,
        searchParams,
        setSearchParams
    } = params;

    const updatedSearchParams = updateSearchParams({
        searchParams,
        updateData: {[key]: value}
    });

    setSearchParams(updatedSearchParams);
}