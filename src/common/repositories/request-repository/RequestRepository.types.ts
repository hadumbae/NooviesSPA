import RequestQueryFilters from "@/common/type/request/RequestQueryFilters.ts";
import RequestPaginatedFilters from "@/common/type/request/RequestPaginatedFilters.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";

/**
 * Parameters for retrieving multiple entities using optional filters and request options.
 *
 * @template TFilters The type of filters to apply. Defaults to `QueryFilters`.
 */
export type GetEntitiesParams<TFilters = RequestQueryFilters> = RequestOptions & {
    /**
     * Optional filters to narrow the query.
     */
    filters?: TFilters;
};

/**
 * Parameters for retrieving a paginated list of entities using filters and request options.
 *
 * @template TFilters The type of paginated filters to apply. Defaults to `PaginatedFilters`.
 */
export type GetPaginatedEntitiesParams<TFilters = RequestPaginatedFilters> = RequestOptions & {
    /**
     * Filters to apply to the paginated query.
     */
    filters?: TFilters;
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
 * Parameters for creating a new entity, including its data and optional population behavior.
 *
 * @template TData The type of the data payload. Defaults to a generic record.
 */
export type CreateEntityParams<TData = Record<string, any>> = RequestOptions & {
    /**
     * The payload used to create the new entity.
     */
    data: TData;
};

/**
 * Parameters for updating an existing entity, including its identifier and updated data.
 *
 * @template TData The type of the update payload. Defaults to a generic record.
 */
export type UpdateEntityParams<TData = Record<string, any>> = RequestOptions & {
    /**
     * The unique identifier of the entity to update.
     */
    readonly _id: ObjectId;

    /**
     * The updated data to apply to the entity.
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

