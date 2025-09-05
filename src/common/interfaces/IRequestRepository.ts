import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import {
    CreateEntityParams, DeleteEntityParams,
    EntityQueryParams,
    GetEntitiesParams,
    GetEntityByIDParams, GetPaginatedEntitiesParams, UpdateEntityParams
} from "@/common/type/repositories/EntityRequestParamTypes.ts";

/**
 * Interface defining a standardized HTTP-based repository contract
 * for performing CRUD operations and entity-level queries.
 *
 * Each method returns a `Promise` resolving to a {@link FetchReturns}
 * object, containing both the raw HTTP `Response` and the typed result data.
 */
export interface IRequestRepository {
    /**
     * Retrieves all matching entities.
     *
     * @param params - Optional query parameters such as filters and population flags.
     * @returns A promise resolving to {@link FetchReturns}.
     */
    getAll<TResult = unknown>(params?: GetEntitiesParams): Promise<FetchReturns<TResult>>;

    /**
     * Retrieves a single entity by its unique `_id`.
     *
     * @param params - Object containing the `_id` and optional query flags.
     * @returns A promise resolving to {@link FetchReturns}.
     */
    get<TResult = unknown>(params: GetEntityByIDParams): Promise<FetchReturns<TResult>>;

    /**
     * Retrieves entities in a paginated format.
     *
     * @param params - Object containing pagination filters and optional flags.
     * @returns A promise resolving to {@link FetchReturns}.
     */
    paginated<TResult = unknown>(params: GetPaginatedEntitiesParams): Promise<FetchReturns<TResult>>;

    /**
     * Creates a new entity.
     *
     * @param params - Object containing the entity data and optional query flags.
     * @returns A promise resolving to {@link FetchReturns}.
     */
    create<TResult = unknown>(params: CreateEntityParams): Promise<FetchReturns<TResult>>;

    /**
     * Updates an existing entity by its `_id`.
     *
     * @param params - Object containing the `_id`, updated data, and optional flags.
     * @returns A promise resolving to {@link FetchReturns}.
     */
    update<TResult = unknown>(params: UpdateEntityParams): Promise<FetchReturns<TResult>>;

    /**
     * Deletes an entity by its `_id`.
     *
     * @param params - Object containing the `_id` of the entity to delete.
     * @returns A promise resolving to {@link FetchReturns}.
     */
    delete<TResult = unknown>(params: DeleteEntityParams): Promise<FetchReturns<TResult>>;

    /**
     * Executes an advanced entity-level query.
     *
     * @param params - Object containing filters, projections, and additional options.
     * @returns A promise resolving to {@link FetchReturns}.
     */
    query<TResult = unknown>(params: EntityQueryParams): Promise<FetchReturns<TResult>>;
}