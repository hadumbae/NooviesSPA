type ValueParams = {
    /**
     * The `URLSearchParams` instance to extract values from.
     */
    searchParams: URLSearchParams;

    /**
     * A list of keys whose values should always be treated as arrays,
     * even if only one value is present in the URL.
     */
    arrayKeys?: string[];
};

/**
 * Converts a `URLSearchParams` object into a plain JavaScript object.
 *
 * - If a key appears multiple times, its values are combined into an array.
 * - If a key is listed in `arrayKeys`, its value is always returned as an array.
 * - Otherwise, single values are returned as strings.
 *
 * @param params - An object containing the `URLSearchParams` instance and optional `arrayKeys`.
 * @returns A record mapping each key to either a string or an array of strings.
 *
 * @example
 * ```ts
 * const searchParams = new URLSearchParams("tag=react&tag=typescript&page=2");
 * const result = getSearchParamValues({ searchParams, arrayKeys: ["tag"] });
 * // Result:
 * // {
 * //   tag: ["react", "typescript"],
 * //   page: "2"
 * // }
 * ```
 */
export default function getSearchParamValues(
    params: ValueParams
): Record<string, string | string[]> {
    const {searchParams, arrayKeys = []} = params;
    const rawData: Record<string, string | string[]> = {};

    for (const [key, value] of searchParams.entries()) {
        if (key in rawData) {
            if (Array.isArray(rawData[key])) {
                rawData[key].push(value);
            } else {
                rawData[key] = [rawData[key], value];
            }
        } else {
            rawData[key] = arrayKeys.includes(key)
                ? [value]
                : value;
        }
    }

    return rawData;
}
