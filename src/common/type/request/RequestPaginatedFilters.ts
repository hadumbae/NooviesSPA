import RequestQueryFilters from "@/common/type/request/RequestQueryFilters.ts";

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
type RequestPaginatedFilters = { page: number, perPage: number } & RequestQueryFilters;

export default RequestPaginatedFilters;