/**
 * @fileoverview Defines the standard wrapper for API request return data.
 */

/** Represents a successful API response containing the requested data. */
export type FetchRequestReturns<TData = unknown> = {
    result: TData;
};
