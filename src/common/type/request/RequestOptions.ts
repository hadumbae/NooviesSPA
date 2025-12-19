import RequestQueryFilters from "@/common/type/request/RequestQueryFilters.ts";

/**
 * @summary
 * Common options for shaping request responses.
 *
 * @description
 * Controls population of related entities, inclusion of virtual fields,
 * and optional result limiting for non-paginated queries.
 */
export type RequestOptions = {
    /**
     * Populate referenced documents (e.g. relations / foreign keys).
     */
    populate?: boolean;

    /**
     * Include virtual properties in the response payload.
     */
    virtuals?: boolean;

    /**
     * Maximum number of results to return.
     *
     * @remarks
     * Intended primarily for non-paginated queries.
     */
    limit?: number;
};

/**
 * @summary
 * Pagination configuration for queries.
 *
 * @description
 * Enforces mutually exclusive pagination states:
 *
 * - When `paginated` is `true`, both `page` and `perPage` are required.
 * - When `paginated` is `false` or omitted, pagination is disabled and
 *   pagination fields are forbidden.
 */
export type RequestPaginationOptions =
    | {
    /**
     * Enable pagination.
     */
    paginated: true;

    /**
     * Current page index (1-based).
     */
    page: number;

    /**
     * Number of items per page.
     */
    perPage: number;
}
    | {
    /**
     * Disable pagination.
     */
    paginated?: false;
    page?: never;
    perPage?: never;
};

/**
 * @summary
 * Generic query options for entity-based requests.
 *
 * @description
 * Combines filtering, request shaping options, and optional pagination
 * into a single query object.
 *
 * @template TFilters
 * Shape of the filter object applied to the query.
 *
 * @defaultValue {@link RequestQueryFilters}
 */
export type RequestQueryOptions<TFilters = RequestQueryFilters> = {
    /**
     * Query parameters including filters, options, and pagination rules.
     */
    queries?: TFilters & RequestOptions & RequestPaginationOptions;
};
