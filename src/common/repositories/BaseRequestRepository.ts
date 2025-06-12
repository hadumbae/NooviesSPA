import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/query/useFetchAPI.ts";
import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import {IBaseRequestRepository} from "@/common/interfaces/IBaseRequestRepository.ts";
import {
    CreateEntityParams, DeleteEntityParams, EntityQueryParams,
    GetEntitiesParams, GetEntityByIDParams,
    GetPaginatedEntitiesParams, UpdateEntityParams
} from "@/common/type/repositories/EntityRequestParamTypes.ts";

/**
 * Creates a standardized HTTP request repository for a given base URL.
 *
 * This factory function returns an object implementing the {@link IBaseRequestRepository} interface,
 * providing generic CRUD operations and query utilities for interacting with a RESTful API.
 *
 * All methods internally construct URLs using query parameters and send requests via `useFetchAPI`.
 *
 * @param baseURL - The base API endpoint to which resource-specific paths will be appended.
 * @returns An object implementing {@link IBaseRequestRepository}, with methods to query, create, update, and delete resources.
 *
 * @example
 * ```ts
 * const UserRepository = createBaseRequestRepository({ baseURL: "/api/users" });
 * const { result } = await UserRepository.getAll({ populate: true });
 * ```
 */
export const createBaseRequestRepository = ({baseURL}: { baseURL: string }): IBaseRequestRepository => ({
    /**
     * Fetches all resources optionally filtered and enriched with virtual/populated fields.
     */
    async getAll(params?: GetEntitiesParams): Promise<FetchReturns> {
        const {filters = {}, populate, virtuals} = params || {};
        const queries = filterEmptyAttributes({...filters, populate, virtuals});

        const url = buildQueryURL({baseURL: baseURL, path: "all", queries});
        return useFetchAPI({url, method: "GET"});
    },

    /**
     * Fetches resources using paginated filters.
     */
    async paginated(params: GetPaginatedEntitiesParams): Promise<FetchReturns> {
        const {filters, populate, virtuals} = params;
        const queries = filterEmptyAttributes({...filters, populate, virtuals});

        const url = buildQueryURL({baseURL: baseURL, path: "paginated", queries});
        return useFetchAPI({url, method: "GET"});
    },

    /**
     * Fetches a single resource by its unique ID.
     */
    async get(params: GetEntityByIDParams): Promise<FetchReturns> {
        const {_id, populate, virtuals} = params;
        const queries = filterEmptyAttributes({populate, virtuals});

        const url = buildQueryURL({baseURL: baseURL, path: `get/${_id}`, queries});
        return useFetchAPI({url, method: "GET"});
    },

    /**
     * Creates a new resource with optional population and virtual fields in the response.
     */
    async create(params: CreateEntityParams): Promise<FetchReturns> {
        const {data, populate, virtuals} = params;
        const queries = filterEmptyAttributes({populate, virtuals});

        const url = buildQueryURL({baseURL: baseURL, path: "create", queries});
        return useFetchAPI({url: url, method: "POST", data});
    },

    /**
     * Updates an existing resource identified by `_id`, with optional population and virtuals in response.
     */
    async update(params: UpdateEntityParams): Promise<FetchReturns> {
        const {_id, data, populate, virtuals} = params;
        const queries = filterEmptyAttributes({populate, virtuals});

        const url = buildQueryURL({baseURL: baseURL, path: `update/${_id}`, queries});
        return useFetchAPI({url: url, method: "PATCH", data});
    },

    /**
     * Deletes a resource by its unique ID.
     */
    async delete(params: DeleteEntityParams): Promise<FetchReturns> {
        const {_id} = params;

        const url = buildQueryURL({baseURL: baseURL, path: `delete/${_id}`});
        return useFetchAPI({url: url, method: "DELETE"});
    },

    async query(params: EntityQueryParams): Promise<FetchReturns> {
        const {queries} = params;
        const filteredQueries = filterEmptyAttributes(queries);

        const url = buildQueryURL({baseURL: baseURL, path: `query`, queries: filteredQueries});
        return useFetchAPI({url, method: "GET"});
    },
})