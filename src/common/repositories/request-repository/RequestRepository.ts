import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";
import { IRequestRepository } from "@/common/repositories/request-repository/IRequestRepository.ts";
import {
    CreateEntityParams,
    DeleteEntityParams,
    GetEntitiesParams,
    GetEntityByIDParams,
    GetPaginatedEntitiesParams,
    UpdateEntityParams
} from "@/common/repositories/request-repository/RequestRepository.types.ts";
import { RequestQueryOptions } from "@/common/type/request/RequestOptions.ts";

/**
 * @file createRequestRepository.ts
 *
 * @summary
 * Factory for creating a standardized HTTP request repository.
 *
 * @description
 * Produces an {@link IRequestRepository} bound to a specific API resource.
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
export const createRequestRepository = (
    { baseURL }: { baseURL: string }
): IRequestRepository => ({
    /**
     * Fetch all entities without pagination.
     *
     * @param params
     * Optional filters and request options.
     */
    async getAll<TResult = unknown>(
        params?: GetEntitiesParams
    ): Promise<RequestReturns<TResult>> {
        const { queries, ...options } = params || {};
        const urlQueries = filterNullishAttributes({
            paginated: false,
            ...queries,
            ...options,
        });

        const url = buildQueryURL({ baseURL, path: "query", queries: urlQueries });
        return useFetchAPI({ url, method: "GET" });
    },

    /**
     * Fetch entities using pagination.
     *
     * @param params
     * Pagination, filters, and request options.
     */
    async paginated<TResult = unknown>(
        params: GetPaginatedEntitiesParams
    ): Promise<RequestReturns<TResult>> {
        const { queries, ...options } = params;
        const urlQueries = filterNullishAttributes({
            paginated: true,
            ...options,
            ...queries,
        });

        const url = buildQueryURL({ baseURL, path: "query", queries: urlQueries });
        return useFetchAPI({ url, method: "GET" });
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
        const { _id, populate, virtuals } = params;
        const queries = filterNullishAttributes({ populate, virtuals });

        const url = buildQueryURL({ baseURL, path: `get/${_id}`, queries });
        return useFetchAPI({ url, method: "GET" });
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
        const { data, populate, virtuals } = params;
        const queries = filterNullishAttributes({ populate, virtuals });

        const url = buildQueryURL({ baseURL, path: "create", queries });
        return useFetchAPI({ url, method: "POST", data });
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
        const { _id, data, populate, virtuals } = params;
        const queries = filterNullishAttributes({ populate, virtuals });

        const url = buildQueryURL({ baseURL, path: `update/${_id}`, queries });
        return useFetchAPI({ url, method: "PATCH", data });
    },

    /**
     * Delete an entity by ID.
     *
     * @param params
     * Entity identifier.
     */
    async delete<TResult = unknown>(
        { _id }: DeleteEntityParams
    ): Promise<RequestReturns<TResult>> {
        const url = buildQueryURL({ baseURL, path: `delete/${_id}` });
        return useFetchAPI({ url, method: "DELETE" });
    },

    /**
     * Execute a flexible query against the resource endpoint.
     *
     * @param params
     * Query filters and options.
     */
    async query<TResult = unknown>(
        { queries }: RequestQueryOptions
    ): Promise<RequestReturns<TResult>> {
        const url = buildQueryURL({
            baseURL,
            path: "query",
            queries: filterNullishAttributes(queries ?? {}),
        });

        return useFetchAPI({ url, method: "GET" });
    },
});
