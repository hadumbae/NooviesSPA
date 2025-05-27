import QueryFilters from "@/common/type/QueryFilters.ts";

/**
 * Represents a filter object for paginated API requests.
 *
 * Combines pagination parameters (`page`, `perPage`) with dynamic query filters.
 * Useful for endpoints that return paginated data based on optional filtering criteria.
 *
 * @example
 * ```ts
 * const filters: PaginatedFilters = {
 *   page: 1,
 *   perPage: 20,
 *   genre: "sci-fi",
 *   rating: { $gte: 8 }
 * };
 * ```
 */
type PaginatedFilters = { page: number, perPage: number } & QueryFilters;

export default PaginatedFilters;