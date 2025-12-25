import RequestQueryFilters from "@/common/type/request/RequestQueryFilters.ts";
import RequestPaginatedFilters from "@/common/type/request/RequestPaginatedFilters.ts";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import { PaginationValues } from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";

// -------------------
// ------ TYPES ------
// -------------------

/**
 * Parameters for retrieving multiple entities.
 *
 * @remarks
 * Supports optional query filters and request-level options
 * such as population, lean mode, or headers.
 *
 * @template TQueries - Filter shape applied to the query.
 */
export type GetEntitiesParams<TQueries = RequestQueryFilters> =
    RequestOptions & {
    /** Optional query filters used to narrow results. */
    queries?: TQueries;
};

/**
 * Parameters for retrieving a paginated list of entities.
 *
 * @remarks
 * Combines pagination controls, query filters, and
 * request-level options into a single parameter object.
 *
 * @template TQueries - Filter shape applied to the paginated query.
 */
export type GetPaginatedEntitiesParams<TQueries = RequestPaginatedFilters> =
    RequestOptions &
    PaginationValues & {
    /** Optional filters applied to the paginated query. */
    queries?: TQueries;
};

/**
 * Parameters for retrieving a single entity by its ObjectId.
 *
 * @remarks
 * Pagination-related options are intentionally excluded,
 * as ID-based retrieval always resolves to a single entity.
 */
export type GetEntityByIDParams =
    Omit<RequestOptions, "limit"> & {
    /** Unique identifier of the target entity. */
    readonly _id: ObjectId;
};

/**
 * Parameters for retrieving a single entity by slug.
 *
 * @remarks
 * Slug-based retrieval is treated as a single-record operation
 * and therefore excludes pagination options.
 */
export type GetEntityBySlugParams =
    Omit<RequestOptions, "limit"> & {
    /** Unique slug identifier. */
    slug: string;
};

/**
 * Parameters for creating a new entity.
 *
 * @template TData - Shape of the creation payload.
 */
export type CreateEntityParams<TData = Record<string, any>> =
    RequestOptions & {
    /** Payload used to create the entity. */
    data: TData;
};

/**
 * Parameters for updating an existing entity.
 *
 * @template TData - Shape of the update payload.
 */
export type UpdateEntityParams<TData = Record<string, any>> =
    RequestOptions & {
    /** Unique identifier of the entity to update. */
    readonly _id: ObjectId;

    /** Partial or full update payload. */
    data: TData;
};

/**
 * Parameters for deleting an entity.
 */
export type DeleteEntityParams = {
    /** Unique identifier of the entity to delete. */
    readonly _id: ObjectId;
};
