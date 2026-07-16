/**
 * @fileoverview Utility for filtering object attributes based on truthiness.
 */

/** Creates a new object containing only the entries with truthy values. */
export function filterFalsyAttributes(data?: Record<string, any>): Record<string, any> {
    if (!data) return {};

    return Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value)
    );
}