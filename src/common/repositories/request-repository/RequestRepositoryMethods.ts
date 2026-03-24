/**
 * @file Standardized interface contract for entity-based HTTP repositories.
 * @filename RequestRepositoryMethods.ts
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
 * Defines the standard set of asynchronous operations for interacting with an API resource.
 * @template TQueries - The interface representing allowed URL search parameters for this specific repository.
 */
export interface RequestRepositoryMethods<TQueries extends RequestQueryParams = RequestQueryParams> {
    /**
     * Executes a flexible GET query against the resource's query endpoint.
     * @param params - Combined object containing domain-specific filters and standard request configuration.
     * @returns A promise resolving to the normalized API response.
     */
    query(params: RequestQueryOptions<TQueries>): Promise<RequestReturns<unknown>>;

    /**
     * Retrieves all entities matching the provided query criteria without pagination.
     * @param params - Optional search parameters and request options.
     * @returns A promise resolving to a collection of entities.
     */
    getAll(params?: GetEntitiesParams<TQueries>): Promise<RequestReturns<unknown>>;

    /**
     * Retrieves a specific subset of entities using pagination metrics.
     * @param params - Configuration including `page`, `perPage`, and optional query filters.
     * @returns A promise resolving to a paginated result set (including items and total count).
     */
    paginated(params: GetPaginatedEntitiesParams<TQueries>): Promise<RequestReturns<unknown>>;

    /**
     * Fetches a single entity record using its primary database identifier.
     * @param params - Object containing the entity `_id` and optional configuration.
     * @returns A promise resolving to the single entity data.
     */
    get(params: GetEntityByIDParams): Promise<RequestReturns<unknown>>;

    /**
     * Fetches a single entity record using its unique, URL-friendly slug.
     * @param params - Object containing the entity `slug` and optional configuration.
     * @returns A promise resolving to the single entity data.
     */
    getBySlug(params: GetEntityBySlugParams): Promise<RequestReturns<unknown>>;

    /**
     * Submits a new entity to the server via a POST request.
     * @param params - The data payload to be created and optional request settings.
     * @returns A promise resolving to the created entity or an error.
     */
    create(params: CreateEntityParams): Promise<RequestReturns<unknown>>;

    /**
     * Updates an existing entity via a PATCH request.
     * @param params - The entity identifier, the update payload, and optional configuration.
     * @returns A promise resolving to the updated entity.
     */
    update(params: UpdateEntityParams): Promise<RequestReturns<unknown>>;

    /**
     * Removes an entity from the database using its ID.
     * @param params - Object containing the `_id` of the entity to be deleted.
     * @returns A promise resolving to the deletion status.
     */
    delete(params: DeleteEntityParams): Promise<RequestReturns<unknown>>;
}