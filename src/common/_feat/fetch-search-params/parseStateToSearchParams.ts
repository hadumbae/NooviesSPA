/**
 * @fileoverview Utility for converting state objects into URL search parameters.
 */

/** Converts a flat or nested object into a URLSearchParams instance. */
export function parseStateToSearchParams(state: unknown) {
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