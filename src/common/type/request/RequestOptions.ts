import RequestQueryFilters from "@/common/type/request/RequestQueryFilters.ts";

/**
 * Common request options to control population of related fields, inclusion of virtuals,
 * and optional limits on returned results.
 */
export type RequestOptions = {
    /**
     * Whether to populate referenced documents (e.g., foreign keys).
     */
    populate?: boolean;

    /**
     * Whether to include virtual properties in the response.
     */
    virtuals?: boolean;

    /**
     * Optional limit for the number of results (primarily for non-paginated queries).
     */
    limit?: number;
};

/**
 * Parameters controlling whether a query should return paginated results.
 *
 * - If `paginated` is `true`, then both `page` and `perPage` are required.
 * - If `paginated` is `false` or omitted, pagination is disabled and `page`/`perPage` must not be present.
 */
export type RequestPaginationOptions = {
    paginated: true;
    page: number;
    perPage: number;
} | {
    paginated?: false;
    page?: never;
    perPage?: never;
};

/**
 * Parameters used to construct a flexible entity query,
 * supporting filtering, population, virtuals, and pagination.
 *
 * @template TFilters - The shape of the filter object. Defaults to {@link RequestQueryFilters}.
 */
export type RequestQueryOptions<TFilters = RequestQueryFilters> = {
    /**
     * A combination of filters, request options, and optional pagination settings.
     */
    queries: TFilters & RequestOptions & RequestPaginationOptions;
};