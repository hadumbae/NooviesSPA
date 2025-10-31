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
 * Creates a standardized HTTP request repository for a specific resource endpoint.
 *
 * @remarks
 * This factory returns an object implementing {@link IRequestRepository}, providing generic
 * CRUD operations (`getAll`, `paginated`, `get`, `create`, `update`, `delete`) and a `query`
 * method. All requests use `useFetchAPI` internally, and URLs are automatically constructed
 * with query parameters via `buildQueryURL`.
 *
 * @param baseURL - The base API endpoint for the resource (e.g., "/api/users").
 * @returns An object implementing {@link IRequestRepository}.
 *
 * @example
 * ```ts
 * const UserRepository = createRequestRepository({ baseURL: "/api/users" });
 * const { result } = await UserRepository.getAll({ populate: true });
 * ```
 */
export const createRequestRepository = ({ baseURL }: { baseURL: string }): IRequestRepository => ({
    /**
     * Fetches all resources, optionally filtered or enriched with virtual/populated fields.
     *
     * @param params - Optional query and request options.
     * @returns A promise resolving to {@link RequestReturns} containing all results.
     */
    async getAll<TResult = unknown>(params?: GetEntitiesParams): Promise<RequestReturns<TResult>> {
        const { queries = {}, ...options } = params || {};
        const urlQueries = filterNullishAttributes({ paginated: false, ...queries, ...options });

        const url = buildQueryURL({ baseURL, path: "query", queries: urlQueries });
        return useFetchAPI({ url, method: "GET" });
    },

    /**
     * Fetches resources with pagination.
     *
     * @param params - Pagination and filter options.
     * @returns A promise resolving to {@link RequestReturns} containing paginated results.
     */
    async paginated<TResult = unknown>(params: GetPaginatedEntitiesParams): Promise<RequestReturns<TResult>> {
        const { queries, ...options } = params;
        const urlQueries = filterNullishAttributes({ paginated: true, ...options, ...queries });

        const url = buildQueryURL({ baseURL, path: "query", queries: urlQueries });
        return useFetchAPI({ url, method: "GET" });
    },

    /**
     * Fetches a single resource by its unique ID.
     *
     * @param params - Parameters including `_id` and optional populate/virtuals flags.
     * @returns A promise resolving to {@link RequestReturns} with the single resource.
     */
    async get<TResult = unknown>(params: GetEntityByIDParams): Promise<RequestReturns<TResult>> {
        const { _id, populate, virtuals } = params;
        const queries = filterNullishAttributes({ populate, virtuals });

        const url = buildQueryURL({ baseURL, path: `get/${_id}`, queries });
        return useFetchAPI({ url, method: "GET" });
    },

    /**
     * Creates a new resource.
     *
     * @param params - Includes `data` to create and optional populate/virtuals.
     * @returns A promise resolving to {@link RequestReturns} with the created resource.
     */
    async create<TResult = unknown>(params: CreateEntityParams): Promise<RequestReturns<TResult>> {
        const { data, populate, virtuals } = params;
        const queries = filterNullishAttributes({ populate, virtuals });

        const url = buildQueryURL({ baseURL, path: "create", queries });
        return useFetchAPI({ url, method: "POST", data });
    },

    /**
     * Updates an existing resource identified by `_id`.
     *
     * @param params - Includes `_id`, update `data`, and optional populate/virtuals.
     * @returns A promise resolving to {@link RequestReturns} with the updated resource.
     */
    async update<TResult = unknown>(params: UpdateEntityParams): Promise<RequestReturns<TResult>> {
        const { _id, data, populate, virtuals } = params;
        const queries = filterNullishAttributes({ populate, virtuals });

        const url = buildQueryURL({ baseURL, path: `update/${_id}`, queries });
        return useFetchAPI({ url, method: "PATCH", data });
    },

    /**
     * Deletes a resource by its unique ID.
     *
     * @param params - Object containing `_id` of the resource to delete.
     * @returns A promise resolving to {@link RequestReturns} indicating success/failure.
     */
    async delete<TResult = unknown>(params: DeleteEntityParams): Promise<RequestReturns<TResult>> {
        const { _id } = params;

        const url = buildQueryURL({ baseURL, path: `delete/${_id}` });
        return useFetchAPI({ url, method: "DELETE" });
    },

    /**
     * Performs a custom query against the resource endpoint.
     *
     * @param params - Query options including filters.
     * @returns A promise resolving to {@link RequestReturns} containing the query results.
     */
    async query<TResult = unknown>(params: RequestQueryOptions): Promise<RequestReturns<TResult>> {
        const { queries } = params;
        const filteredQueries = filterNullishAttributes(queries);

        const url = buildQueryURL({ baseURL, path: "query", queries: filteredQueries });
        return useFetchAPI({ url, method: "GET" });
    },
});
