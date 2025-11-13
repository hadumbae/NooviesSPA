import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";

type URLParams = {
    /**
     * The base URL, e.g., "https://api.example.com".
     */
    baseURL: string;

    /**
     * The path to append to the base URL, e.g., "users".
     */
    path: string;

    /**
     * Optional query parameters to append to the URL.
     * Nullish values (`null` or `undefined`) are automatically filtered out.
     * Values can be strings, numbers, objects, or arrays of these.
     */
    queries?: Record<string, any>;
};

/**
 * Builds a fully qualified URL with query parameters.
 *
 * - Combines `baseURL` and `path`.
 * - Appends query parameters from the `queries` object.
 * - Nullish values are filtered out using `filterNullishAttributes`.
 * - Arrays are appended with bracket notation, e.g., `key[]=value1&key[]=value2`.
 * - Non-string values are serialized via `JSON.stringify`.
 *
 * @param params - An object containing `baseURL`, `path`, and optional `queries`.
 * @returns A string representing the full URL with encoded query parameters.
 *
 * @example
 * ```ts
 * const url = buildQueryURL({
 *   baseURL: "https://api.example.com",
 *   path: "users",
 *   queries: {
 *     tags: ["admin", "editor"],
 *     active: true,
 *     filter: null
 *   }
 * });
 * // Result: "https://api.example.com/users?tags[]=admin&tags[]=editor&active=true"
 * ```
 */
export default function buildQueryURL({ baseURL, path, queries }: URLParams): string {
    const url = new URL(`${baseURL}/${path}`);

    if (queries) {
        const filteredQueries = filterNullishAttributes(queries);

        Object.entries(filteredQueries).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                for (const item of value as any[]) {
                    const payload = typeof item === "string" ? item : JSON.stringify(item);
                    url.searchParams.append(`${key}[]`, payload);
                }
            } else {
                const payload = typeof value === "string" ? value : JSON.stringify(value);
                url.searchParams.append(key, payload);
            }
        });
    }

    return url.toString();
}
