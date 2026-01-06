import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {RequestRepositoryMethods} from "@/common/repositories/request-repository/RequestRepositoryMethods.ts";
import {
    CreateEntityParams,
    DeleteEntityParams,
    GetEntitiesParams,
    GetEntityByIDParams, GetEntityBySlugParams,
    GetPaginatedEntitiesParams,
    UpdateEntityParams
} from "@/common/repositories/request-repository/RequestRepository.types.ts";
import {RequestQueryOptions} from "@/common/type/request/RequestOptions.ts";
import RequestQueryParams from "@/common/type/request/RequestQueryParams.ts";

/**
 * @file createRequestRepository.ts
 *
 * @summary
 * Factory for creating a standardized HTTP request repository.
 *
 * @description
 * Produces an {@link RequestRepositoryMethods} bound to a specific API resource.
 * All requests:
 * - Use {@link useFetchAPI} for transport
 * - Build URLs via {@link buildQueryURL}
 * - Omit nullish query parameters automatically
 *
 * Supported operations include CRUD, pagination, and flexible querying.
 *
 * @example
 * ```ts
 * const UserRepository = createRequestRepository({ baseURL: "/api/users" });
 * const { result } = await UserRepository.getAll({ populate: true });
 * ```
 */
export const createRequestRepository = <TQueries extends RequestQueryParams = RequestQueryParams>({baseURL}: {
    baseURL: string
}): RequestRepositoryMethods => ({
    /**
     * Fetch all entities without pagination.
     *
     * @param params
     * Optional filters and request options.
     */
    async getAll(params?: GetEntitiesParams<TQueries>): Promise<RequestReturns<unknown>> {
        const {queries, config} = params ?? {};

        const url = buildQueryURL({
            baseURL,
            path: "query",
            queries: {
                ...queries,
                ...config,
            },
        });

        return useFetchAPI({url, method: "GET"});
    },

    /**
     * Fetch entities using pagination.
     *
     * @param params
     * Pagination, filters, and request options.
     */
    async paginated(params: GetPaginatedEntitiesParams<TQueries>): Promise<RequestReturns<unknown>> {
        const {page, perPage, queries, config} = params;

        const url = buildQueryURL({
            baseURL,
            path: "query",
            queries: {
                paginated: true,
                page,
                perPage,
                ...queries,
                ...config,
            },
        });

        return useFetchAPI({url, method: "GET"});
    },

    /**
     * Fetch a single entity by ID.
     *
     * @param params
     * Entity identifier and optional request options.
     */
    async get<TResult = unknown>(
        params: GetEntityByIDParams
    ): Promise<RequestReturns<TResult>> {
        const {_id, config = {}} = params;

        const url = buildQueryURL({
            baseURL,
            path: `get/${_id}`,
            queries: config,
        });

        return useFetchAPI({url, method: "GET"});
    },

    async getBySlug<TResult = unknown>(
        params: GetEntityBySlugParams
    ): Promise<RequestReturns<TResult>> {
        const {slug, config} = params;

        const url = buildQueryURL({
            baseURL,
            path: `slug/${slug}`,
            queries: config,
        });

        return useFetchAPI({url, method: "GET"});
    },

    /**
     * Create a new entity.
     *
     * @param params
     * Payload and optional request options.
     */
    async create<TResult = unknown>(
        params: CreateEntityParams
    ): Promise<RequestReturns<TResult>> {
        const {data, config} = params;

        const url = buildQueryURL({
            baseURL,
            path: "create",
            queries: config,
        });

        return useFetchAPI({url, method: "POST", data});
    },

    /**
     * Update an existing entity.
     *
     * @param params
     * Entity ID, update payload, and optional request options.
     */
    async update<TResult = unknown>(
        params: UpdateEntityParams
    ): Promise<RequestReturns<TResult>> {
        const {_id, data, config} = params;

        const url = buildQueryURL({
            baseURL,
            path: `update/${_id}`,
            queries: config,
        });

        return useFetchAPI({url, method: "PATCH", data});
    },

    /**
     * Delete an entity by ID.
     *
     * @param params
     * Entity identifier.
     */
    async delete<TResult = unknown>(
        {_id}: DeleteEntityParams
    ): Promise<RequestReturns<TResult>> {
        const url = buildQueryURL({baseURL, path: `delete/${_id}`});
        return useFetchAPI({url, method: "DELETE"});
    },

    /**
     * Execute a flexible query against the resource endpoint.
     *
     * @param params
     * Query filters and options.
     */
    async query<TResult = unknown>(
        {queries, config}: RequestQueryOptions
    ): Promise<RequestReturns<TResult>> {
        const url = buildQueryURL({
            baseURL,
            path: "query",
            queries: {
                ...queries,
                ...config,
            },
        });

        return useFetchAPI({url, method: "GET"});
    },
});
