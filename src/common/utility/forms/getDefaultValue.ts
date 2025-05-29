/**
 * Returns the first non-nullish (`null` or `undefined`) value from the provided arguments.
 *
 * This utility is useful for resolving default values where `preset` takes priority over `data`,
 * and `fallback` acts as a final fallback if both are nullish.
 *
 * @template TData - The primary data type being checked.
 * @template TFallback - The type of the fallback value.
 *
 * @param preset - A preset value that takes the highest priority if defined.
 * @param data - A secondary value used if `preset` is nullish.
 * @param fallback - A fallback value used if both `preset` and `data` are nullish.
 *
 * @returns The first non-nullish value among `preset`, `data`, or `fallback`.
 *
 * @example
 * ```ts
 * getDefaultValue(undefined, "hello", "default"); // returns "hello"
 * getDefaultValue(null, null, 42); // returns 42
 * ```
 */
export default function getDefaultValue<TData, TFallback>(preset: TData, data: TData, fallback: TFallback): TData | TFallback {
    return preset ?? data ?? fallback;
}