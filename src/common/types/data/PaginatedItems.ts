/**
 * @fileoverview Generic interface for paginated data sets.
 */

/**
 * Structure for paginated data containing the total count and the data subset.
 */
export type PaginatedItems<TData = unknown> = {
    totalItems: number;
    items: TData[];
};