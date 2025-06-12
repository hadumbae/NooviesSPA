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
export interface IBaseRequestRepository {
    /**
     * Retrieves all matching entities.
     *
     * @param params - Optional query parameters such as filters and population flags.
     * @returns A promise resolving to {@link FetchReturns}.
     */
    getAll(params?: GetEntitiesParams): Promise<FetchReturns>;

    /**
     * Retrieves a single entity by its unique `_id`.
     *
     * @param params - Object containing the `_id` and optional query flags.
     * @returns A promise resolving to {@link FetchReturns}.
     */
    get(params: GetEntityByIDParams): Promise<FetchReturns>;

    /**
     * Retrieves entities in a paginated format.
     *
     * @param params - Object containing pagination filters and optional flags.
     * @returns A promise resolving to {@link FetchReturns}.
     */
    paginated(params: GetPaginatedEntitiesParams): Promise<FetchReturns>;

    /**
     * Creates a new entity.
     *
     * @param params - Object containing the entity data and optional query flags.
     * @returns A promise resolving to {@link FetchReturns}.
     */
    create(params: CreateEntityParams): Promise<FetchReturns>;

    /**
     * Updates an existing entity by its `_id`.
     *
     * @param params - Object containing the `_id`, updated data, and optional flags.
     * @returns A promise resolving to {@link FetchReturns}.
     */
    update(params: UpdateEntityParams): Promise<FetchReturns>;

    /**
     * Deletes an entity by its `_id`.
     *
     * @param params - Object containing the `_id` of the entity to delete.
     * @returns A promise resolving to {@link FetchReturns}.
     */
    delete(params: DeleteEntityParams): Promise<FetchReturns>;

    /**
     * Executes an advanced entity-level query.
     *
     * @param params - Object containing filters, projections, and additional options.
     * @returns A promise resolving to {@link FetchReturns}.
     */
    query(params: EntityQueryParams): Promise<FetchReturns>;
}