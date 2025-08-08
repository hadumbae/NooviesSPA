/**
 * Converts a plain object into URL query parameters.
 *
 * This function takes an input `state` object and converts its properties
 * into URLSearchParams. It handles nested objects by JSON-stringifying them,
 * and arrays by appending each item as repeated query parameters.
 * Null and undefined values are skipped.
 *
 * @param state - The input object to convert. If `state` is not an object or is an array, an empty URLSearchParams is returned.
 *
 * @returns URLSearchParams representing the key-value pairs of the input object.
 *
 * @example
 * ```ts
 * convertToQueryParams({
 *   name: "Alice",
 *   age: 30,
 *   tags: ["student", "gamer"],
 *   preferences: { theme: "dark" }
 * });
 * // Produces URLSearchParams equivalent to:
 * // ?name=Alice&age=30&tags=student&tags=gamer&preferences={"theme":"dark"}
 * ```
 */
export default function convertToQueryParams(state: unknown) {
    const params = new URLSearchParams();

    if (state && !Array.isArray(state) && typeof state === "object") {
        Object.entries(state).forEach(([key, value]) => {
            if (value === undefined || value === null) {
                return;
            }

            if (Array.isArray(value)) {
                value.forEach(item => params.append(key, String(item)))
            } else if (typeof value === "object") {
                params.append(key, JSON.stringify(value));
            } else {
                params.append(key, String(value));
            }
        });
    }

    return params;
}