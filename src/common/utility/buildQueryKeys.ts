/**
 * @file Factory utility for generating consistent, type-safe TanStack Query key structures.
 * @filename buildQueryKeys.ts
 */

/** * Utility type that adds an "all" property to a union of keys.
 */
export type WithAllKeys<T> = "all" | T;

/** * A mapping of feature names to their respective query key segments (arrays of strings).
 */
export type QueryKeyMeta<TKeys extends string> = Record<TKeys, string[]>;

/** * A function that accepts optional parameters and returns a finalized query key array.
 */
export type QueryKeyFunction = <TParams extends Record<string, any>>(params?: TParams) => readonly any[];

/** * The resulting object containing the "all" base key and specific query key functions.
 */
export type QueryKeyReturns<TKeys extends string> = {
    [K in WithAllKeys<TKeys>]: K extends "all"
        ? string[]
        : QueryKeyFunction;
};

/**
 * Constructs a standardized query key factory for a specific domain or feature.
 * @param baseKey - The root array segments for this query group (e.g., `["reservations"]`).
 * @param meta - An object mapping function names to their specific sub-key arrays.
 * @returns An object containing the `all` base key and dynamic key-generating functions.
 */
export const buildQueryKey = <TKeys extends string>(
    baseKey: string[],
    meta: QueryKeyMeta<TKeys>
): QueryKeyReturns<TKeys> => {
    /** The root key used for broad cache invalidation. */
    const baseRecord = ["all", baseKey];

    /** Map the meta definitions into functions that append parameters to the base segments. */
    const keyRecords = (Object.entries(meta) as [TKeys, string[]][])
        .map(([fnName, queryKey]) => [
            fnName as TKeys,
            <TParams extends Record<string, any>>(params?: TParams) =>
                params
                    ? [...baseKey, ...queryKey, params]
                    : [...baseKey, ...queryKey]
        ]);


    return Object.fromEntries([baseRecord, ...keyRecords]);
}