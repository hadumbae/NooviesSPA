/**
 * @file Utility for converting native URLSearchParams into a structured JavaScript object.
 * @filename stringifySearchParamValues.ts
 */

/**
 * Configuration parameters for extracting values from search parameters.
 */
type ValueParams = {
    /** The native Web API instance containing the raw URL query string data. */
    searchParams: URLSearchParams;

    /**
     * Specific keys that must be treated as arrays, even if only one value exists in the URL.
     * This ensures compatibility with Zod schemas using `z.array()`, preventing
     * validation failures when only a single item is selected.
     */
    arrayFieldKeys?: string[];
};

/**
 * Transforms `URLSearchParams` into a plain object while preserving multi-value keys and forced arrays.
 * @param params - Configuration object containing the `URLSearchParams` and optional array key definitions.
 * @returns A record mapping each key to either a single string or an array of strings.
 */
export default function stringifySearchParamValues(
    params: ValueParams
): Record<string, string | string[]> {
    const {searchParams, arrayFieldKeys} = params;
    const queryStrings: Record<string, string | string[]> = {};

    for (const [key, value] of searchParams.entries()) {
        if (key in queryStrings) {
            if (Array.isArray(queryStrings[key])) {
                (queryStrings[key] as string[]).push(value);
            } else {
                queryStrings[key] = [queryStrings[key] as string, value];
            }
        } else {
            queryStrings[key] = arrayFieldKeys?.includes(key)
                ? [value]
                : value;
        }
    }

    return queryStrings;
}