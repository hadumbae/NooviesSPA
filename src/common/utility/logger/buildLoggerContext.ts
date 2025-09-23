/**
 * Represents a key–value pair for logger context.
 *
 * The `value` can be any type, including falsy values (`false`, `0`, `""`),
 * but `null` and `undefined` are considered "missing" and will typically
 * be filtered out before building a context object.
 */
export type LoggerContextKeyData = {
    key: string;
    value: unknown;
};

/**
 * Converts an array of `LoggerContextKeyData` into a plain object,
 * filtering out entries whose values are `null` or `undefined`.
 *
 * Falsy values like `false`, `0`, and `""` are preserved.
 *
 * ### Example
 * ```ts
 * const context: LoggerContextKeyData[] = [
 *   { key: "userId", value: 123 },
 *   { key: "isActive", value: false },
 *   { key: "nickname", value: "" },
 *   { key: "session", value: null },
 *   { key: "meta", value: undefined }
 * ];
 *
 * const result = buildContext(context);
 * // result:
 * // {
 * //   userId: 123,
 * //   isActive: false,
 * //   nickname: ""
 * // }
 * ```
 *
 * @param values - Array of key–value pairs to convert.
 * @returns A plain object mapping each `key` to its corresponding non-nullish `value`.
 */
export default function buildContext(
    values: LoggerContextKeyData[]
): Record<string, unknown> {
    const filteredValues = values
        .filter((val) => val.value !== undefined && val.value !== null)
        .map(({ key, value }) => [key, value]);

    return Object.fromEntries(filteredValues);
}
