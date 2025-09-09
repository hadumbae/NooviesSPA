/**
 * Converts all values of an object into strings while preserving its keys.
 *
 * This is especially useful when preparing objects for use in contexts that
 * require string-only values, such as URL query/search parameters.
 *
 * @typeParam TKey - The type of the object keys (defaults to `string`).
 *
 * @param obj - The input object with arbitrary values.
 *
 * @returns A new object with the same keys as `obj` but with all values
 * converted to strings.
 *
 * @example
 * ```ts
 * const role = {
 *   id: 123,
 *   name: "Director",
 *   active: true,
 * };
 *
 * const result = stringifyValues(role);
 * // result: { id: "123", name: "Director", active: "true" }
 * ```
 */
export default function stringifyValues<TKey extends string | number | symbol = string>(obj: Record<TKey, any>) {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, String(value)])
    );
}