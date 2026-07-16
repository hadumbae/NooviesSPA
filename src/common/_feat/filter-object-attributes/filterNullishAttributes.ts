/**
 * @fileoverview Utility for filtering nullish attributes from object records.
 */

/** Removes null, undefined, and empty string values from an object. */
export function filterNullishAttributes(data?: Record<string, any>): Record<string, any> {
    if (!data) return {};

    return Object.fromEntries(
        Object.entries(data).filter(
            ([_, value]) => value !== null && value !== undefined && value !== ""
        )
    );
}
