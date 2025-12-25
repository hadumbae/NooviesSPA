import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";

/**
 * Fetch-by-slug parameters.
 *
 * @remarks
 * Defines the parameter shape for retrieving a single entity
 * using a unique, human-readable slug.
 *
 * Request-level options (e.g. population, lean mode) are separated
 * from client-side query configuration to keep transport concerns
 * and caching concerns clearly distinct.
 *
 * Pagination fields are intentionally omitted, as slug-based
 * retrieval always resolves to a single record.
 *
 * @template TData - Expected response data type.
 */
export type FetchBySlugParams<TData = unknown> = {
    /** Unique slug identifier. */
    slug: string;

    /** Optional request-level options applied to the fetch operation. */
    queryConfig?: Omit<RequestOptions, "limit">;

    /** Optional client-side query options (e.g. React Query config). */
    queryOptions?: UseQueryOptions<TData>;
};
