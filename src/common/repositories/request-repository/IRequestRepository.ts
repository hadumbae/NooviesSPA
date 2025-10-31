import RequestReturns from "@/common/type/request/RequestReturns.ts";
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
 * Interface defining a standardized HTTP-based repository for performing CRUD operations
 * and advanced entity-level queries against a RESTful API endpoint.
 *
 * @remarks
 * All methods return a `Promise` resolving to a {@link RequestReturns} object, which contains
 * both the raw HTTP `Response` and the typed result data (`TResult`).
 *
 * @template TResult - The expected result type returned by each repository method.
 */
export interface IRequestRepository {
    /**
     * Executes a custom query against the endpoint, allowing advanced filtering,
     * projections, or other request-specific options.
     *
     * @param params - Object containing query filters, options, and projections.
     * @returns A promise resolving to {@link RequestReturns} containing the query results.
     */
    query<TResult = unknown>(params: RequestQueryOptions): Promise<RequestReturns<TResult>>;

    /**
     * Retrieves all matching entities from the endpoint.
     *
     * @param params - Optional filters, population flags, or query options.
     * @returns A promise resolving to {@link RequestReturns} containing an array of results.
     */
    getAll<TResult = unknown>(params?: GetEntitiesParams): Promise<RequestReturns<TResult>>;

    /**
     * Retrieves a single entity by its unique `_id`.
     *
     * @param params - Object containing `_id` and optional population/virtuals flags.
     * @returns A promise resolving to {@link RequestReturns} containing the requested entity.
     */
    get<TResult = unknown>(params: GetEntityByIDParams): Promise<RequestReturns<TResult>>;

    /**
     * Retrieves entities in a paginated format, with optional filtering.
     *
     * @param params - Object containing pagination settings, filters, and query options.
     * @returns A promise resolving to {@link RequestReturns} with paginated results.
     */
    paginated<TResult = unknown>(params: GetPaginatedEntitiesParams): Promise<RequestReturns<TResult>>;

    /**
     * Creates a new entity at the endpoint.
     *
     * @param params - Object containing entity `data` and optional populate/virtuals flags.
     * @returns A promise resolving to {@link RequestReturns} with the created entity.
     */
    create<TResult = unknown>(params: CreateEntityParams): Promise<RequestReturns<TResult>>;

    /**
     * Updates an existing entity identified by its `_id`.
     *
     * @param params - Object containing `_id`, updated `data`, and optional populate/virtuals flags.
     * @returns A promise resolving to {@link RequestReturns} with the updated entity.
     */
    update<TResult = unknown>(params: UpdateEntityParams): Promise<RequestReturns<TResult>>;

    /**
     * Deletes an entity by its unique `_id`.
     *
     * @param params - Object containing the `_id` of the entity to remove.
     * @returns A promise resolving to {@link RequestReturns} indicating deletion success.
     */
    delete<TResult = unknown>(params: DeleteEntityParams): Promise<RequestReturns<TResult>>;
}
