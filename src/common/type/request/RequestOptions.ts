import RequestQueryParams from "@/common/type/request/RequestQueryParams.ts";

/**
 * Common options for shaping request responses.
 */
export type RequestOptions = {
    /** Populate referenced documents. */
    populate?: boolean;

    /** Include virtual properties. */
    virtuals?: boolean;

    /** Maximum number of results (non-paginated). */
    limit?: number;
};

/**
 * Pagination configuration for queries.
 *
 * Enforces mutually exclusive paginated / non-paginated states.
 */
export type RequestPaginationOptions =
    | {
    /** Enable pagination. */
    paginated: true;

    /** Current page (1-based). */
    page: number;

    /** Items per page. */
    perPage: number;
}
    | {
    /** Disable pagination. */
    paginated?: false;
    page?: never;
    perPage?: never;
};

/**
 * Generic query options for entity requests.
 *
 * @template TQueries - Query filter shape.
 */
export type RequestQueryOptions<
    TQueries extends RequestQueryParams = RequestQueryParams
> = {
    /** Query filters. */
    queries?: TQueries;

    /** Request-level options. */
    config?: RequestOptions;
};
