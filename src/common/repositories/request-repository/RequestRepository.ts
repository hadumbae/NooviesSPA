/**
 * @file Factory for creating a standardized HTTP request repository for API resources.
 * @filename createRequestRepository.ts
 */

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
 * Creates a standard repository object bound to a specific base URL for a resource.
 * @param config - Repository configuration including the base API endpoint.
 * @returns An object containing standardized methods for CRUD and querying operations.
 */
export const createRequestRepository = <TQueries extends RequestQueryParams = RequestQueryParams>({baseURL}: {
    baseURL: string
}): RequestRepositoryMethods => ({
    /**
     * Retrieves all entities for a resource without pagination.
     * @param params - Optional filters and standard request configuration.
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
     * Retrieves a paginated subset of entities.
     * @param params - Required page/perPage metrics, plus optional filters.
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
     * Fetches a single entity using its unique database identifier.
     * @param params - Object containing the entity `_id`.
     */
    async get(
        params: GetEntityByIDParams
    ): Promise<RequestReturns<unknown>> {
        const {_id, config = {}} = params;

        const url = buildQueryURL({
            baseURL,
            path: `get/${_id}`,
            queries: config,
        });

        return useFetchAPI({url, method: "GET"});
    },

    /**
     * Fetches a single entity using its URL-friendly slug.
     * @param params - Object containing the entity `slug`.
     */
    async getBySlug(
        params: GetEntityBySlugParams
    ): Promise<RequestReturns<unknown>> {
        const {slug, config} = params;

        const url = buildQueryURL({
            baseURL,
            path: `slug/${slug}`,
            queries: config,
        });

        return useFetchAPI({url, method: "GET"});
    },

    /**
     * Persists a new entity to the resource collection.
     * @param params - The data payload and optional configuration.
     */
    async create(
        params: CreateEntityParams
    ): Promise<RequestReturns<unknown>> {
        const {data, config} = params;

        const url = buildQueryURL({
            baseURL,
            path: "create",
            queries: config,
        });

        return useFetchAPI({url, method: "POST", data});
    },

    /**
     * Updates an existing entity via a PATCH request.
     * @param params - The entity ID and the partial or full update payload.
     */
    async update(
        params: UpdateEntityParams
    ): Promise<RequestReturns<unknown>> {
        const {_id, data, config} = params;

        const url = buildQueryURL({
            baseURL,
            path: `update/${_id}`,
            queries: config,
        });

        return useFetchAPI({url, method: "PATCH", data});
    },

    /**
     * Permanently removes an entity from the resource collection.
     * @param params - Object containing the entity `_id` to delete.
     */
    async delete(
        {_id}: DeleteEntityParams
    ): Promise<RequestReturns<unknown>> {
        const url = buildQueryURL({baseURL, path: `delete/${_id}`});
        return useFetchAPI({url, method: "DELETE"});
    },

    /**
     * Performs a generic GET query against the resource's query endpoint.
     * Useful for complex filtering that doesn't fit standard CRUD patterns.
     * @param params - Combined query and configuration options.
     */
    async query(
        {queries, config}: RequestQueryOptions
    ): Promise<RequestReturns<unknown>> {
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