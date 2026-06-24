/**
 * @fileoverview Utility for converting native URLSearchParams into a structured JavaScript object.
 */

/** Configuration for extracting values from search parameters. */
type ValueParams = {
    searchParams: URLSearchParams;
    arrayFieldKeys?: string[];
};

/**
 * Transforms URLSearchParams into a plain object while preserving multi-value keys and forced arrays.
 */
export default function stringifySearchParamValues(
    params: ValueParams
): Record<string, string | string[]> {
    const {searchParams, arrayFieldKeys} = params;
    const queryStrings: Record<string, string | string[]> = {};

    for (const [key, value] of searchParams.entries()) {
        if (!value) continue;

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