/**
 * Represents the parameters used to determine a default value.
 *
 * @typeParam TData - The type of the primary data values (`preset` and `data`).
 * @typeParam TFallback - The type of the fallback value.
 */
interface ValueParams<TData, TFallback> {
    /**
     * An optional preset value that takes precedence if provided.
     */
    preset?: TData;

    /**
     * An optional data value used if `preset` is undefined.
     */
    data?: TData;

    /**
     * A fallback value used if both `preset` and `data` are undefined.
     */
    fallback: TFallback;
}

/**
 * Determines the effective value by selecting the first defined value among `preset`, `data`, and `fallback`.
 *
 * @typeParam TData - The type of the primary data values (`preset` and `data`).
 * @typeParam TFallback - The type of the fallback value.
 *
 * @param values - An object containing `preset`, `data`, and `fallback` values.
 * @returns The first defined value among `preset`, `data`, and `fallback`.
 *
 * @example
 * ```typescript
 * const result = getDefaultValue({
 *   preset: undefined,
 *   data: "value",
 *   fallback: "default"
 * });
 * // result is "value"
 * ```
 */
export default function getDefaultValue<TData, TFallback>(values: ValueParams<TData, TFallback>): TData | TFallback {
    const {preset, data, fallback} = values;
    return preset ?? data ?? fallback;
}