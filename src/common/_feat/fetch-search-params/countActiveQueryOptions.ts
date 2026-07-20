/**
 * @fileoverview Utility for calculating the number of active search parameters.
 */

/** Calculates how many search parameters contain non-empty and defined values. */
export function countActiveQueryOptions(searchParams: Record<string, unknown>): number {
    return Object.values(searchParams)
        .filter((value) => value !== "" && value !== null && value !== undefined)
        .length;
}