import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/query/useFetchAPI.ts";
import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import PaginatedFilters from "@/common/type/PaginatedFilters.ts";
import {IRequestRepository} from "@/common/interfaces/IRequestRepository.ts";

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
 * const UserRepository = createBaseRequestRepository({ baseURL: "/api/users" });
 * const { result } = await UserRepository.getAll({ populate: true });
 * ```
 */
export const createBaseRequestRepository = ({baseURL}: { baseURL: string }): IRequestRepository => ({
    /**
     * Fetches all resources optionally filtered and enriched with virtual/populated fields.
     */
    async getAll(
        params?: { filters?: QueryFilters; populate?: boolean; virtuals?: boolean }
    ): Promise<FetchReturns> {
        const { filters = {}, populate, virtuals } = params || {};
        const queries = filterEmptyAttributes({ ...filters, populate, virtuals });

        const url = buildQueryURL({ baseURL: baseURL, path: "all", queries });
        return useFetchAPI({ url, method: "GET" });
    },

    /**
     * Fetches resources using paginated filters.
     */
    async paginated(
        params: { filters: PaginatedFilters; populate?: boolean; virtuals?: boolean }
    ): Promise<FetchReturns> {
        const { filters, populate, virtuals } = params;
        const queries = filterEmptyAttributes({ ...filters, populate, virtuals });

        const url = buildQueryURL({ baseURL: baseURL, path: "paginated", queries });
        return useFetchAPI({ url, method: "GET" });
    },

    /**
     * Fetches a single resource by its unique ID.
     */
    async get(
        params: { _id: ObjectId; populate?: boolean; virtuals?: boolean }
    ): Promise<FetchReturns> {
        const { _id, populate, virtuals } = params;
        const queries = filterEmptyAttributes({ populate, virtuals });

        const url = buildQueryURL({ baseURL: baseURL, path: `get/${_id}`, queries });
        return useFetchAPI({ url, method: "GET" });
    },

    /**
     * Creates a new resource with optional population and virtual fields in the response.
     */
    async create(
        params: { data: Record<string, any>; populate?: boolean; virtuals?: boolean }
    ): Promise<FetchReturns> {
        const { data, populate, virtuals } = params;
        const queries = filterEmptyAttributes({ populate, virtuals });

        const url = buildQueryURL({ baseURL: baseURL, path: "create", queries });
        return useFetchAPI({ url: url, method: "POST", data });
    },

    /**
     * Updates an existing resource identified by `_id`, with optional population and virtuals in response.
     */
    async update(
        params: { _id: string; data: Record<string, any>; populate?: boolean; virtuals?: boolean }
    ): Promise<FetchReturns> {
        const { _id, data, populate, virtuals } = params;
        const queries = filterEmptyAttributes({ populate, virtuals });

        const url = buildQueryURL({ baseURL: baseURL, path: `update/${_id}`, queries });
        return useFetchAPI({ url: url, method: "PATCH", data });
    },

    /**
     * Deletes a resource by its unique ID.
     */
    async delete(
        params: { _id: string }
    ): Promise<FetchReturns> {
        const { _id } = params;

        const url = buildQueryURL({ baseURL: baseURL, path: `delete/${_id}` });
        return useFetchAPI({ url: url, method: "DELETE" });
    },
})