/**
 * Represents a generic filter object used to build query parameters for API requests.
 *
 * Keys are typically field names, and values can be strings, numbers, booleans,
 * arrays, or any valid filter criteria depending on backend expectations.
 *
 * Used to dynamically construct filterable API calls such as `.getAll()`, `.paginated()`, etc.
 *
 * @example
 * ```ts
 * const filters: QueryFilters = {
 *   genre: "comedy",
 *   year: { $gte: 2000 },
 *   isPublished: true
 * };
 * ```
 */
type QueryFilters = Record<string, any>;

export default QueryFilters;