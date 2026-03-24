/**
 * Represents the acceptable types for URL search parameter values.
 */
export type SearchParamValue =
    string |
    number |
    boolean |
    null |
    undefined |
    object |
    Array<string | number | boolean>;

/**
 * Parameters object for updating search parameters.
 */
type UpdateParams = {
    searchParams: URLSearchParams;
    updateData: Record<string, SearchParamValue>;
};

/**
 * Updates a `URLSearchParams` instance by applying the specified key-value pairs.
 * @param searchParams - Existing `URLSearchParams` to update.
 * @param updateValues - Object mapping parameter names to values to apply.
 * @returns A new `URLSearchParams` instance with the updates applied.
 */
export default function updateSearchParams(
    {searchParams, updateData}: UpdateParams
): URLSearchParams {
    if (Object.keys(updateData).length === 0) {
        return new URLSearchParams();
    }

    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    const keysToRetain = Object.keys(updateData);
    for (let keyToDelete of updatedSearchParams.keys()) {
        if (!keysToRetain.includes(keyToDelete)) {
            updatedSearchParams.delete(keyToDelete);
        }
    }

    Object.entries(updateData).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
            updatedSearchParams.delete(key);
        } else if (Array.isArray(value)) {
            updatedSearchParams.delete(key);

            for (let val of value) {
                updatedSearchParams.append(key, val.toString())
            }
        } else if (typeof value === 'object') {
            updatedSearchParams.set(key, JSON.stringify(value));
        } else {
            updatedSearchParams.set(key, value.toString());
        }
    });

    return updatedSearchParams;
}
