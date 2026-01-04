import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";

/**
 * Generic parameter object for query-based fetch operations.
 *
 * @template TOptions
 * The shape of the query/filter options accepted by the endpoint.
 *
 * @template TData
 * The expected response data type returned by the query.
 *
 * @remarks
 * This type is commonly used by data-fetching hooks to bundle:
 * - Query/filter parameters
 * - Low-level request configuration
 * - React Query–style query options
 */
export type FetchByQueryParams<TOptions, TData = unknown> = {
    /**
     * Query or filter parameters sent to the API.
     */
    queries?: TOptions;

    /**
     * Request-level configuration such as headers or credentials.
     */
    queryConfig?: RequestOptions;

    /**
     * Query behavior configuration (caching, retries, selectors, etc.).
     */
    queryOptions?: UseQueryOptions<TData>;
};
