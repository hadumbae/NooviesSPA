/**
 * @fileoverview Utility for constructing standardized API URLs.
 * Orchestrates path concatenation and intelligent query string serialization,
 * including support for arrays and JSON-stringified complex objects.
 */

import {API_URL} from "@/common/features/fetch-api/apiEnvValues.ts";

/**
 * Configuration for the {@link buildURL} function.
 */
export type BuildURLConfig = {
    baseURL: string;
    path: string;
    queries?: Record<string, unknown>;
};

/**
 * Constructs a fully qualified URL for API requests, prepending the environment's base URL.
 */
export function buildURL({baseURL, path, queries}: BuildURLConfig): string {
    const url = new URL(`${API_URL}${baseURL}${path}`);

    if (queries) {
        for (const [key, value] of Object.entries(queries)) {
            if (value === null || value === undefined || value === "") {
                continue;
            }

            if (Array.isArray(value)) {
                for (const item of value) {
                    const payload = typeof item === "string" ? item : JSON.stringify(item);
                    url.searchParams.append(`${key}[]`, payload);
                }
            } else {
                const payload = typeof value === "string" ? value : JSON.stringify(value);
                url.searchParams.append(key, payload);
            }
        }
    }

    return url.toString();
}