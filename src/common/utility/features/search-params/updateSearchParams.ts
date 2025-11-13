/**
 * Represents the acceptable types for URL search parameter values.
 *
 * - **Primitive types**: `string`, `number`, `boolean`
 * - **Arrays of primitives**: each element becomes a separate parameter
 * - **Objects**: serialized via `JSON.stringify`
 * - **Null or undefined**: indicates removal of the parameter
 */
export type SearchParamValue = string | number | boolean | null | undefined | object | Array<string | number | boolean>;

/**
 * Parameters object for updating search parameters.
 *
 * @property searchParams - The current `URLSearchParams` instance to be updated.
 * @property updateValues - A record of key-value pairs representing updates to apply.
 *   - Keys not included in this object will be removed from the resulting search parameters.
 *   - Values can be primitives, arrays, or objects. Objects are JSON-stringified.
 */
type UpdateParams = {
    searchParams: URLSearchParams;
    updateValues: Record<string, SearchParamValue>;
};

/**
 * Updates a `URLSearchParams` instance by applying the specified key-value pairs.
 *
 * Returns a **new** `URLSearchParams` instance with the following rules:
 *
 * 1. **Remove parameters**: If a value is `undefined`, `null`, or an empty string (`""`), the corresponding key is removed.
 * 2. **Append arrays**: If a value is an array, each element is appended as a separate parameter with the same key.
 * 3. **Serialize objects**: If a value is a non-array object, it is serialized using `JSON.stringify`.
 * 4. **Set primitives**: Primitive values (`string`, `number`, `boolean`) are converted to strings and set as a single parameter.
 * 5. **Remove stale keys**: Keys present in the original `searchParams` but not in `updateValues` are removed.
 *
 * @param params - The object containing the current search parameters and updates.
 * @param params.searchParams - Existing `URLSearchParams` to update.
 * @param params.updateValues - Object mapping parameter names to values to apply.
 * @returns A new `URLSearchParams` instance with the updates applied.
 *
 * @example
 * ```ts
 * const currentParams = new URLSearchParams("page=1&filter=old");
 * const updated = updateSearchParams({
 *   searchParams: currentParams,
 *   updateValues: { page: 2, filter: null, tags: ["action", "drama"] }
 * });
 * // Resulting query string: "page=2&tags=action&tags=drama"
 * ```
 */
export default function updateSearchParams(
    {searchParams, updateValues}: UpdateParams
): URLSearchParams {
    // ⚡ Update Is Empty ⚡

    if (Object.keys(updateValues).length === 0) {
        return new URLSearchParams();
    }

    // ⚡ New Search Params ⚡

    const newSearchParams = new URLSearchParams(searchParams.toString());

    // ⚡ Remove Unused Keys ⚡

    const updateKeys = Object.keys(updateValues);
    Array.from(newSearchParams.keys())
        .filter(k => !updateKeys.includes(k))
        .forEach(key => newSearchParams.delete(key));

    // ⚡ Update Search Params ⚡

    Object.entries(updateValues).forEach(([key, val]) => {
        if (val === undefined || val === null || val === '') {
            newSearchParams.delete(key);
        } else if (Array.isArray(val)) {
            newSearchParams.delete(key);
            val.forEach(item => newSearchParams.append(key, item.toString()));
        } else if (typeof val === 'object') {
            newSearchParams.set(key, JSON.stringify(val));
        } else {
            newSearchParams.set(key, val.toString());
        }
    });

    return newSearchParams;
}
