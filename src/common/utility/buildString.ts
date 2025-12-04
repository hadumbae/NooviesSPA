/**
 * @file buildString.ts
 *
 * @summary Utility function to construct a string from multiple values with a custom separator.
 *
 * @description
 * Takes an array of values of unknown type and returns a string containing
 * only the non-empty string and number values, joined by the specified separator.
 * - Filters out `null`, `undefined`, `false`, empty strings, and other non-string/number values.
 * - Converts all remaining values to strings before joining.
 *
 * Useful for building class names, labels, or concatenated output safely.
 *
 * @param args - An array of values of any type to be included in the resulting string.
 * @param separator - Optional string used to separate each value in the output. Defaults to a single space `" "`.
 * @returns A single string with filtered arguments joined by the specified separator.
 *
 * @example
 * ```ts
 * buildString(["hello", "", 42, null, "world"]);                // "hello 42 world"
 * buildString(["foo", false, "bar"], "-");                      // "foo-bar"
 * buildString([1, 2, 3], ", ");                                 // "1, 2, 3"
 * buildString(["apple", undefined, "banana", 0]);               // "apple 0 banana"
 * ```
 */

export default function buildString(args: unknown[], separator: string = " "): string {
    return args
        .filter(arg => typeof arg === "number" || (typeof arg === "string" && arg.trim() !== ""))
        .map(arg => `${arg}`)
        .join(separator);
}
