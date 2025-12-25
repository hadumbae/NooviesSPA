import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {
    CreateEntityParams,
    DeleteEntityParams,
    GetEntitiesParams,
    GetEntityByIDParams,
    GetEntityBySlugParams,
    UpdateEntityParams,
} from "@/common/repositories/request-repository/RequestRepository.types.ts";
import { RequestQueryOptions } from "@/common/type/request/RequestOptions.ts";
import RequestQueryFilters from "@/common/type/request/RequestQueryFilters.ts";

/**
 * Standard HTTP-based repository contract.
 *
 * @remarks
 * Defines a consistent interface for performing CRUD operations
 * and advanced entity-level queries against RESTful API endpoints.
 *
 * All methods resolve to {@link RequestReturns}, which encapsulates
 * both the raw HTTP response and the typed response payload.
 */
export interface RequestRepositoryMethods {
    /**
     * Execute a fully configurable query against the endpoint.
     *
     * @remarks
     * Intended for advanced use cases such as custom filters,
     * projections, aggregation-style queries, or dynamic query options.
     *
     * @param params - Query options and filters.
     */
    query<TResult = unknown>(
        params: RequestQueryOptions,
    ): Promise<RequestReturns<TResult>>;

    /**
     * Retrieve all matching entities.
     *
     * @param params - Optional query filters and request options.
     */
    getAll<TResult = unknown>(
        params?: GetEntitiesParams,
    ): Promise<RequestReturns<TResult>>;

    /**
     * Retrieve a single entity by its ObjectId.
     *
     * @param params - Identifier and request-level options.
     */
    get<TResult = unknown>(
        params: GetEntityByIDParams,
    ): Promise<RequestReturns<TResult>>;

    /**
     * Retrieve a single entity by its slug.
     *
     * @param params - Slug identifier and request-level options.
     */
    getBySlug<TResult = unknown>(
        params: GetEntityBySlugParams,
    ): Promise<RequestReturns<TResult>>;

    /**
     * Retrieve entities using pagination.
     *
     * @remarks
     * Designed for list views that require pagination with
     * optional filtering and request-level configuration.
     *
     * @param params - Pagination filters and query options.
     */
    paginated<TResult = unknown>(
        params: RequestQueryFilters,
    ): Promise<RequestReturns<TResult>>;

    /**
     * Create a new entity.
     *
     * @param params - Creation payload and request-level options.
     */
    create<TResult = unknown>(
        params: CreateEntityParams,
    ): Promise<RequestReturns<TResult>>;

    /**
     * Update an existing entity.
     *
     * @param params - Identifier, update payload, and request-level options.
     */
    update<TResult = unknown>(
        params: UpdateEntityParams,
    ): Promise<RequestReturns<TResult>>;

    /**
     * Delete an entity by its ObjectId.
     *
     * @param params - Identifier of the entity to delete.
     */
    delete<TResult = unknown>(
        params: DeleteEntityParams,
    ): Promise<RequestReturns<TResult>>;
}
