/**
 * Converts an object with optional properties into a string-only object,
 * filtering out keys with falsy values.
 *
 * This is especially useful for preparing query/search parameters where
 * not every key will always be present. Only keys with truthy values
 * are included in the result.
 *
 * @typeParam TData - The shape of the input object. All properties are optional.
 *
 * @param obj - A partial object whose values will be converted to strings.
 *
 * @returns A new object containing only the keys from `obj` that had
 * truthy values, with all values converted to strings.
 *
 * @example
 * ```ts
 * const params = stringifySearchParams({
 *   search: "movie",
 *   page: 2,
 *   sort: null,
 * });
 *
 * // Result:
 * // { search: "movie", page: "2" }
 * // (note: `sort` is omitted because its value was null)
 * ```
 */
export default function stringifySearchParams<TData extends Record<string, any> = Record<string, any>>(obj: Partial<TData>) {
    return Object.fromEntries(
        Object.entries(obj)
            .filter(([_, value]) => !!value)
            .map(([key, value]) => [key, String(value)])
    );
}