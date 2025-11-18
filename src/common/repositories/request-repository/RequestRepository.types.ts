import RequestQueryFilters from "@/common/type/request/RequestQueryFilters.ts";
import RequestPaginatedFilters from "@/common/type/request/RequestPaginatedFilters.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";

/**
 * Parameters for retrieving multiple entities with optional filters and request options.
 *
 * @template TQueries - The type of query filters to apply. Defaults to {@link RequestQueryFilters}.
 */
export type GetEntitiesParams<TQueries = RequestQueryFilters> = RequestOptions & {
    /**
     * Optional query filters to narrow down the results.
     */
    queries?: TQueries;
};

/**
 * Parameters for retrieving a paginated list of entities using filters and pagination settings.
 *
 * @template TQueries - The type of filters to apply to the paginated query. Defaults to {@link RequestPaginatedFilters}.
 */
export type GetPaginatedEntitiesParams<TQueries = RequestPaginatedFilters> = RequestOptions & PaginationValues & {
    /**
     * Filters to apply for the paginated query.
     */
    queries?: TQueries;
};

/**
 * Parameters for retrieving a single entity by its unique identifier.
 */
export type GetEntityByIDParams = RequestOptions & {
    /**
     * The unique identifier of the entity to retrieve.
     */
    readonly _id: ObjectId;
};

/**
 * Parameters for creating a new entity.
 *
 * @template TData - The type of the creation payload. Defaults to a generic object.
 */
export type CreateEntityParams<TData = Record<string, any>> = RequestOptions & {
    /**
     * The payload used to create the new entity.
     */
    data: TData;
};

/**
 * Parameters for updating an existing entity by its identifier.
 *
 * @template TData - The type of the update payload. Defaults to a generic object.
 */
export type UpdateEntityParams<TData = Record<string, any>> = RequestOptions & {
    /**
     * The unique identifier of the entity to update.
     */
    readonly _id: ObjectId;

    /**
     * The data to apply to the entity update.
     */
    data: TData;
};

/**
 * Parameters for deleting an entity by its unique identifier.
 */
export type DeleteEntityParams = {
    /**
     * The unique identifier of the entity to delete.
     */
    readonly _id: ObjectId;
};
