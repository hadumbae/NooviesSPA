/**
 * Represents the acceptable types for URL search parameter values.
 * - Primitives: string, number, boolean
 * - Arrays of primitives
 * - Objects (which will be JSON-stringified)
 * - null or undefined (indicates removal of the parameter)
 */
type SearchParamValue = string | number | boolean | null | undefined | object | Array<string | number | boolean>;

/**
 * Updates the provided URLSearchParams instance by applying the specified key-value pairs.
 *
 * - If a value is `undefined`, `null`, or an empty string, the corresponding parameter is removed.
 * - If a value is an array, each element is appended as a separate parameter with the same key.
 * - If a value is an object (excluding arrays), it is serialized using `JSON.stringify`.
 * - Primitive values are converted to strings and set as single parameters.
 *
 * @param params - An object containing:
 *   - `searchParams`: The current URLSearchParams instance to be updated.
 *   - `updateValues`: A record of key-value pairs to apply to the search parameters.
 * @returns A new URLSearchParams instance with the applied updates.
 */
export default function updateSearchParams(
    {searchParams, updateValues}: { searchParams: URLSearchParams, updateValues: Record<string, SearchParamValue> }
): URLSearchParams {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    Object
        .entries(updateValues)
        .forEach(([key, val]) => {
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