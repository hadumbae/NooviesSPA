/**
 * @fileoverview Utility for converting parsed search param filter values back into HTML input-ready strings.
 */

/**
 * Converts parsed scalar filter values back into HTML input-ready strings,
 * dropping empty/null/undefined entries. Not intended for array-valued fields.
 */
export function parseSearchParamFormValues<TData extends Record<string, unknown>>(
    values: TData
): Partial<Record<keyof TData, string>> {
    return Object.fromEntries(
        Object.entries(values)
            .filter(([, value]) => value != null && value !== "")
            .map(([key, value]) => [key, String(value)])
    ) as Partial<Record<keyof TData, string>>;
}