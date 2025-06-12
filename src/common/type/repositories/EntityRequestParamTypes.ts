import QueryFilters from "@/common/type/QueryFilters.ts";
import PaginatedFilters from "@/common/type/PaginatedFilters.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

/**
 * Common request options to control population of related fields, inclusion of virtuals,
 * and optional limits on returned results.
 */
export type RequestOptions = {
    /**
     * Whether to populate referenced documents (e.g., foreign keys).
     */
    populate?: boolean;

    /**
     * Whether to include virtual properties in the response.
     */
    virtuals?: boolean;

    /**
     * Optional limit for the number of results (primarily for non-paginated queries).
     */
    limit?: number;
};

/**
 * Parameters for retrieving multiple entities using optional filters and request options.
 *
 * @template TFilters The type of filters to apply. Defaults to `QueryFilters`.
 */
export type GetEntitiesParams<TFilters = QueryFilters> = RequestOptions & {
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
export type GetPaginatedEntitiesParams<TFilters = PaginatedFilters> = RequestOptions & {
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

/**
 * Parameters controlling whether a query should return paginated results.
 *
 * - If `paginated` is `true`, then both `page` and `perPage` are required.
 * - If `paginated` is `false` or omitted, pagination is disabled and `page`/`perPage` must not be present.
 */
export type EntityPaginatedQuery = {
    paginated: true;
    page: number;
    perPage: number;
} | {
    paginated?: false;
    page?: never;
    perPage?: never;
};

/**
 * Parameters used to construct a flexible entity query,
 * supporting filtering, population, virtuals, and pagination.
 *
 * @template TFilters - The shape of the filter object. Defaults to {@link QueryFilters}.
 */
export type EntityQueryParams<TFilters = QueryFilters> = {
    /**
     * A combination of filters, request options, and optional pagination settings.
     */
    queries: TFilters & RequestOptions & EntityPaginatedQuery;
};