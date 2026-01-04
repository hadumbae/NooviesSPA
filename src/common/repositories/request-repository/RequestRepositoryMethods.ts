/**
 * @file RequestRepositoryMethods.ts
 *
 * Standard HTTP repository method contract.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {
    CreateEntityParams,
    DeleteEntityParams,
    GetEntitiesParams,
    GetEntityByIDParams,
    GetEntityBySlugParams,
    GetPaginatedEntitiesParams,
    UpdateEntityParams,
} from "@/common/repositories/request-repository/RequestRepository.types.ts";
import {RequestQueryOptions} from "@/common/type/request/RequestOptions.ts";
import RequestQueryParams from "@/common/type/request/RequestQueryParams.ts";

/**
 * Repository interface for entity-based HTTP operations.
 *
 * @template TQueries - Supported query parameter shape.
 */
export interface RequestRepositoryMethods<TQueries extends RequestQueryParams = RequestQueryParams> {
    /**
     * Execute a fully configurable query.
     */
    query(params: RequestQueryOptions<TQueries>): Promise<RequestReturns<unknown>>;

    /**
     * Retrieve all matching entities.
     */
    getAll(params?: GetEntitiesParams<TQueries>): Promise<RequestReturns<unknown>>;

    /**
     * Retrieve entities using pagination.
     */
    paginated(params: GetPaginatedEntitiesParams<TQueries>): Promise<RequestReturns<unknown>>;

    /**
     * Retrieve a single entity by ID.
     */
    get(params: GetEntityByIDParams): Promise<RequestReturns<unknown>>;

    /**
     * Retrieve a single entity by slug.
     */
    getBySlug(params: GetEntityBySlugParams): Promise<RequestReturns<unknown>>;

    /**
     * Create a new entity.
     */
    create(params: CreateEntityParams): Promise<RequestReturns<unknown>>;

    /**
     * Update an existing entity.
     */
    update(params: UpdateEntityParams): Promise<RequestReturns<unknown>>;

    /**
     * Delete an entity by ID.
     */
    delete(params: DeleteEntityParams): Promise<RequestReturns<unknown>>;
}
