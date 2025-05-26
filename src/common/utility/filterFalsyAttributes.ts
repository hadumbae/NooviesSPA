/**
 * Removes key-value pairs from an object where the value is falsy.
 *
 * Falsy values include: `false`, `0`, `''` (empty string), `null`, `undefined`, and `NaN`.
 *
 * @param data - The object to filter.
 * @returns A new object containing only the key-value pairs with truthy values.
 *
 * @example
 * ```ts
 * const input = { a: 0, b: "hello", c: false, d: "world" };
 * const result = filterFalsyAttributes(input);
 * // result: { b: "hello", d: "world" }
 * ```
 */
export default function filterFalsyAttributes(data: Record<string, any>) {
    return Object
        .fromEntries(
            Object.entries(data).filter(([_, value]) => value)
        );
}