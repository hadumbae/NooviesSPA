/**
 * @fileoverview Factory utility for generating consistent, type-safe TanStack Query key structures.
 */

/**
 * Utility type that adds an "all" property to a union of keys.
 */
export type WithAllKeys<T> = "all" | T;

/**
 * A mapping of feature names to their respective query key segments.
 */
export type QueryKeyMeta<TKeys extends string> = Record<TKeys, string[]>;

/**
 * A function that accepts optional parameters and returns a finalized query key array.
 */
export type QueryKeyFunction = (...args: any[]) => readonly any[];

/**
 * The resulting object containing the "all" base key and specific query key functions.
 */
export type QueryKeyReturns<TKeys extends string> = {
    [K in WithAllKeys<TKeys>]: K extends "all"
        ? string[]
        : QueryKeyFunction;
};

/**
 * Constructs a standardized query key factory for a specific domain or feature.
 */
export function buildQueryKey<TKeys extends string>(
    baseKey: string[], meta: QueryKeyMeta<TKeys>
): QueryKeyReturns<TKeys> {
    const keyRecords = (Object.entries(meta) as [TKeys, string[]][]).map(
        ([fnName, queryKey]) => [fnName as TKeys, (...args: any[]) => [...baseKey, ...queryKey, ...args]]
    );

    return Object.fromEntries([
        ["all", ...baseKey],
        ...keyRecords,
    ]);
}