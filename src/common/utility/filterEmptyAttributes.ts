/**
 * Removes all key-value pairs from the given object where the value is
 * `null`, `undefined`, or an empty string (`""`).
 *
 * This function preserves values such as `0`, `false`, and `NaN`, which may
 * be valid in many use cases. It is commonly used to clean objects before
 * sending them to APIs or storing them, ensuring only meaningful data is retained.
 *
 * @param data - An object containing key-value pairs to be filtered.
 * @returns A new object with all properties that had empty values removed.
 *
 * @example
 * ```ts
 * const input = {
 *   name: '',
 *   age: 0,
 *   subscribed: false,
 *   email: null,
 *   phone: undefined,
 * };
 *
 * const result = filterEmptyAttributes(input);
 * // result: { age: 0, subscribed: false }
 * ```
 */
export default function filterEmptyAttributes(data: Record<string, any>) {
    return Object.fromEntries(
        Object
            .entries(data)
            .filter(([_, value]) => value !== null && value !== undefined && value !== '')
    );
}