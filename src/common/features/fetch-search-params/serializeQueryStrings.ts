/**
 * @file Utility for preparing raw data objects for use as URL search parameters.
 * @filename serializeQueryStrings.ts
 */

/**
 * Transforms a key-value object into a record of strings, strictly filtering out nullish and empty values.
 * @param obj - A raw data object (typically a state object or form values) to be serialized.
 */
export default function serializeQueryStrings(
    obj?: Record<string, any>
): Record<string, string> {
    if (obj) {
        return Object.fromEntries(
            Object.entries(obj)
                .filter(([_, value]) => value !== undefined && value !== null && value !== "")
                .map(([key, value]) => [key, String(value)])
        );
    } else {
        return {};
    }
}