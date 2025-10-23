import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/query/useFetchAPI.ts";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import {IRequestRepository} from "@/common/repositories/request-repository/IRequestRepository.ts";
import {
    CreateEntityParams, DeleteEntityParams, GetEntitiesParams, GetEntityByIDParams,
    GetPaginatedEntitiesParams, UpdateEntityParams
} from "@/common/repositories/request-repository/RequestRepository.types.ts";
import {RequestQueryOptions} from "@/common/type/request/RequestOptions.ts";

/**
 * Creates a standardized HTTP request repository for a given base URL.
 *
 * This factory function returns an object implementing the {@link IRequestRepository} interface,
 * providing generic CRUD operations and query utilities for interacting with a RESTful API.
 *
 * All methods internally construct URLs using query parameters and send requests via `useFetchAPI`.
 *
 * @param baseURL - The base API endpoint to which resource-specific paths will be appended.
 * @returns An object implementing {@link IRequestRepository}, with methods to query, create, update, and delete resources.
 *
 * @example
 * ```ts
 * const UserRepository = createRequestRepository({ baseURL: "/api/users" });
 * const { result } = await UserRepository.getAll({ populate: true });
 * ```
 */
export const createRequestRepository = ({baseURL}: { baseURL: string }): IRequestRepository => ({
    /**
     * Fetches all resources optionally filtered and enriched with virtual/populated fields.
     */
    async getAll<TResult = unknown>(params?: GetEntitiesParams): Promise<RequestReturns<TResult>> {
        const {filters = {}, populate, virtuals} = params || {};
        const queries = filterEmptyAttributes({...filters, populate, virtuals});

        const url = buildQueryURL({baseURL: baseURL, path: "all", queries});
        return useFetchAPI({url, method: "GET"});
    },

    /**
     * Fetches resources using paginated filters.
     */
    async paginated<TResult = unknown>(params: GetPaginatedEntitiesParams): Promise<RequestReturns<TResult>> {
        const {filters, populate, virtuals} = params;
        const queries = filterEmptyAttributes({...filters, populate, virtuals});

        const url = buildQueryURL({baseURL: baseURL, path: "paginated", queries});
        return useFetchAPI({url, method: "GET"});
    },

    /**
     * Fetches a single resource by its unique ID.
     */
    async get<TResult = unknown>(params: GetEntityByIDParams): Promise<RequestReturns<TResult>> {
        const {_id, populate, virtuals} = params;
        const queries = filterEmptyAttributes({populate, virtuals});

        const url = buildQueryURL({baseURL: baseURL, path: `get/${_id}`, queries});
        return useFetchAPI({url, method: "GET"});
    },

    /**
     * Creates a new resource with optional population and virtual fields in the response.
     */
    async create<TResult = unknown>(params: CreateEntityParams): Promise<RequestReturns<TResult>> {
        const {data, populate, virtuals} = params;
        const queries = filterEmptyAttributes({populate, virtuals});

        const url = buildQueryURL({baseURL: baseURL, path: "create", queries});
        return useFetchAPI({url: url, method: "POST", data});
    },

    /**
     * Updates an existing resource identified by `_id`, with optional population and virtuals in response.
     */
    async update<TResult = unknown>(params: UpdateEntityParams): Promise<RequestReturns<TResult>> {
        const {_id, data, populate, virtuals} = params;
        const queries = filterEmptyAttributes({populate, virtuals});

        const url = buildQueryURL({baseURL: baseURL, path: `update/${_id}`, queries});
        return useFetchAPI({url: url, method: "PATCH", data});
    },

    /**
     * Deletes a resource by its unique ID.
     */
    async delete<TResult = unknown>(params: DeleteEntityParams): Promise<RequestReturns<TResult>> {
        const {_id} = params;

        const url = buildQueryURL({baseURL: baseURL, path: `delete/${_id}`});
        return useFetchAPI({url: url, method: "DELETE"});
    },

    async query<TResult = unknown>(params: RequestQueryOptions): Promise<RequestReturns<TResult>> {
        const {queries} = params;
        const filteredQueries = filterEmptyAttributes(queries);

        const url = buildQueryURL({baseURL: baseURL, path: `query`, queries: filteredQueries});
        return useFetchAPI({url, method: "GET"});
    },
})