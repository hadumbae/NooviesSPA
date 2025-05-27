import QueryFilters from "@/common/type/QueryFilters.ts";
import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import PaginatedFilters from "@/common/type/PaginatedFilters.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

/**
 * Interface defining a standardized repository contract for performing
 * CRUD operations and queries over a data model using HTTP.
 *
 * All methods return a `Promise` resolving to a {@link FetchReturns} object
 * containing both the raw `Response` and the typed result data.
 */
export interface IRequestRepository {
    /**
     * Retrieves all matching documents.
     *
     * @param params - Optional query parameters.
     * @param params.filters - Optional filters to apply.
     * @param params.populate - Whether to populate referenced fields.
     * @param params.virtuals - Whether to include virtual fields.
     *
     * @returns A promise resolving to {@link FetchReturns}.
     */
    getAll(params?: { filters?: QueryFilters; populate?: boolean; virtuals?: boolean }): Promise<FetchReturns>;

    /**
     * Retrieves a single document by its `_id`.
     *
     * @param params - The document identifier and optional query flags.
     * @param params._id - The unique identifier of the document.
     * @param params.populate - Whether to populate referenced fields.
     * @param params.virtuals - Whether to include virtual fields.
     *
     * @returns A promise resolving to {@link FetchReturns}.
     */
    get(params: { _id: string; populate?: boolean; virtuals?: boolean }): Promise<FetchReturns>;

    /**
     * Retrieves documents in a paginated format based on filters.
     *
     * @param params - Query parameters including pagination settings.
     * @param params.filters - Required paginated filter criteria.
     * @param params.populate - Whether to populate referenced fields.
     * @param params.virtuals - Whether to include virtual fields.
     *
     * @returns A promise resolving to {@link FetchReturns}.
     */
    paginated(params: { filters: PaginatedFilters; populate?: boolean; virtuals?: boolean }): Promise<FetchReturns>;

    /**
     * Creates a new document.
     *
     * @param params - The data to create, with optional query flags.
     * @param params.data - The record to create, as a generic object.
     * @param params.populate - Whether to populate referenced fields after creation.
     * @param params.virtuals - Whether to include virtual fields in the result.
     *
     * @returns A promise resolving to {@link FetchReturns}.
     */
    create(params: { data: Record<string, any>; populate?: boolean; virtuals?: boolean }): Promise<FetchReturns>;

    /**
     * Updates an existing document by `_id`.
     *
     * @param params - The document ID and update payload.
     * @param params._id - The identifier of the document to update.
     * @param params.data - The updated data for the document.
     * @param params.populate - Whether to populate referenced fields after update.
     * @param params.virtuals - Whether to include virtual fields in the result.
     *
     * @returns A promise resolving to {@link FetchReturns}.
     */
    update(params: { _id: ObjectId; data: Record<string, any>; populate?: boolean; virtuals?: boolean }): Promise<FetchReturns>;

    /**
     * Deletes a document by `_id`.
     *
     * @param params - The identifier of the document to delete.
     *
     * @returns A promise resolving to {@link FetchReturns}.
     */
    delete(params: { _id: ObjectId }): Promise<FetchReturns>;
}