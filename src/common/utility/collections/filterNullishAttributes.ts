/**
 * Remove nullish and empty-string values from an object.
 *
 * Filters out properties whose values are:
 * - `null`
 * - `undefined`
 * - empty strings (`""`)
 *
 * Preserves valid falsy values such as `0`, `false`, and `NaN`.
 * Commonly used to sanitize query parameters or request payloads
 * before sending them to an API.
 *
 * @param data - Source object to be cleaned.
 * @returns A new object containing only meaningful values.
 */
export default function filterNullishAttributes(data?: Record<string, any>): Record<string, any> {
    if (!data) {
        return {};
    }

    return Object.fromEntries(
        Object.entries(data).filter(
            ([_, value]) =>
                value !== null &&
                value !== undefined &&
                value !== ""
        )
    );
}
