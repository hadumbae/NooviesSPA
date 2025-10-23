import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {
    CreateEntityParams, DeleteEntityParams,
    GetEntitiesParams,
    GetEntityByIDParams, GetPaginatedEntitiesParams, UpdateEntityParams
} from "@/common/repositories/request-repository/RequestRepository.types.ts";
import {RequestQueryOptions} from "@/common/type/request/RequestOptions.ts";

/**
 * Interface defining a standardized HTTP-based repository contract
 * for performing CRUD operations and entity-level queries.
 *
 * Each method returns a `Promise` resolving to a {@link RequestReturns}
 * object, containing both the raw HTTP `Response` and the typed result data.
 */
export interface IRequestRepository {
    /**
     * Retrieves all matching entities.
     *
     * @param params - Optional query parameters such as filters and population flags.
     * @returns A promise resolving to {@link RequestReturns}.
     */
    getAll<TResult = unknown>(params?: GetEntitiesParams): Promise<RequestReturns<TResult>>;

    /**
     * Retrieves a single entity by its unique `_id`.
     *
     * @param params - Object containing the `_id` and optional query flags.
     * @returns A promise resolving to {@link RequestReturns}.
     */
    get<TResult = unknown>(params: GetEntityByIDParams): Promise<RequestReturns<TResult>>;

    /**
     * Retrieves entities in a paginated format.
     *
     * @param params - Object containing pagination filters and optional flags.
     * @returns A promise resolving to {@link RequestReturns}.
     */
    paginated<TResult = unknown>(params: GetPaginatedEntitiesParams): Promise<RequestReturns<TResult>>;

    /**
     * Creates a new entity.
     *
     * @param params - Object containing the entity data and optional query flags.
     * @returns A promise resolving to {@link RequestReturns}.
     */
    create<TResult = unknown>(params: CreateEntityParams): Promise<RequestReturns<TResult>>;

    /**
     * Updates an existing entity by its `_id`.
     *
     * @param params - Object containing the `_id`, updated data, and optional flags.
     * @returns A promise resolving to {@link RequestReturns}.
     */
    update<TResult = unknown>(params: UpdateEntityParams): Promise<RequestReturns<TResult>>;

    /**
     * Deletes an entity by its `_id`.
     *
     * @param params - Object containing the `_id` of the entity to delete.
     * @returns A promise resolving to {@link RequestReturns}.
     */
    delete<TResult = unknown>(params: DeleteEntityParams): Promise<RequestReturns<TResult>>;

    /**
     * Executes an advanced entity-level query.
     *
     * @param params - Object containing filters, projections, and additional options.
     * @returns A promise resolving to {@link RequestReturns}.
     */
    query<TResult = unknown>(params: RequestQueryOptions): Promise<RequestReturns<TResult>>;
}