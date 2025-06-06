import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";

type URLParams = {
    /** The base URL of the API, e.g., "https://api.example.com" */
    baseURL: string;

    /** The path to append, e.g., "movies/search" */
    path: string;

    /** Optional query parameters to include in the URL */
    queries?: Record<string, any>;
}

/**
 * Constructs a full URL with query parameters, suitable for API requests.
 *
 * - Filters out undefined/null/empty query values.
 * - Arrays are appended using repeated keys: `?tag=a&tag=b`.
 * - Non-string primitives are JSON-stringified.
 *
 * @example
 * ```ts
 * buildQueryURL({
 *   baseURL: "https://api.example.com",
 *   path: "movies",
 *   queries: { genre: ["comedy", "drama"], limit: 10 }
 * });
 * // Returns: "https://api.example.com/movies?genre=comedy&genre=drama&limit=10"
 * ```
 *
 * @param {URLParams} param
 * @returns {string} The constructed URL with query parameters.
 */
export default function buildQueryURL({baseURL, path, queries}: URLParams): string {
    const url = new URL(`${baseURL}/${path}`);

    if (queries) {
        const filteredQueries = filterEmptyAttributes(queries);

        Object.entries(filteredQueries).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(item => {
                    const payload = typeof item === "string" ? item : JSON.stringify(item);
                    url.searchParams.append(key, payload);
                })
            } else {
                const payload = typeof value === "string" ? value : JSON.stringify(value);
                url.searchParams.append(key, payload);
            }
        });
    }

    return url.toString();
}