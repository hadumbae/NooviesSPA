/**
 * @file EntityRequestParams.ts
 *
 * Shared parameter types for entity-based request operations.
 */

import RequestQueryParams from "@/common/type/request/RequestQueryParams.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import {RequestSubmitData} from "@/common/type/request/RequestParamTypes.ts";

/**
 * Parameters for retrieving multiple entities.
 *
 * @template TQueries - Query filter shape.
 */
export type GetEntitiesParams<
    TQueries extends RequestQueryParams = RequestQueryParams
> = {
    /** Optional query filters. */
    queries?: TQueries;

    /** Request-level configuration. */
    config?: RequestOptions;
};

/**
 * Parameters for retrieving a paginated list of entities.
 *
 * @template TQueries - Query filter shape.
 */
export type GetPaginatedEntitiesParams<
    TQueries extends RequestQueryParams  = RequestQueryParams
> = PaginationValues & {
    /** Optional query filters. */
    queries?: TQueries;

    /** Request-level configuration. */
    config?: RequestOptions;
};

/**
 * Parameters for retrieving a single entity by ID.
 */
export type GetEntityByIDParams = {
    /** Target entity identifier. */
    readonly _id: ObjectId;

    /** Request-level configuration (pagination excluded). */
    config?: Omit<RequestOptions, "limit">;
};

/**
 * Parameters for retrieving a single entity by slug.
 */
export type GetEntityBySlugParams = {
    /** Target entity slug. */
    readonly slug: string;

    /** Request-level configuration (pagination excluded). */
    config?: Omit<RequestOptions, "limit">;
};

/**
 * Parameters for creating a new entity.
 *
 * @template TData - Payload shape.
 */
export type CreateEntityParams<
    TData extends RequestSubmitData = RequestSubmitData
> = {
    /** Creation payload. */
    data: TData;

    /** Request-level configuration. */
    config?: Omit<RequestOptions, "limit">;
};

/**
 * Parameters for updating an existing entity.
 *
 * @template TData - Payload shape.
 */
export type UpdateEntityParams<
    TData extends RequestSubmitData = RequestSubmitData
> = {
    /** Target entity identifier. */
    readonly _id: ObjectId;

    /** Update payload. */
    data: TData;

    /** Request-level configuration. */
    config?: Omit<RequestOptions, "limit">;
};

/**
 * Parameters for deleting an entity.
 */
export type DeleteEntityParams = {
    /** Target entity identifier. */
    readonly _id: ObjectId;
};
