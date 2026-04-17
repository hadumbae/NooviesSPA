/**
 * @fileoverview React Query hook for fetching a single Person record by ID.
 * Integrates Zod schema validation and standardized query options to ensure
 * type-safety and consistent caching for administrative Person details.
 */

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ZodSchema, ZodTypeDef } from "zod";
import { findByID } from "@/domains/persons/_feat/crud";
import { PersonCRUDQueryKeys } from "@/domains/persons/_feat/crud-hooks/PersonCRUDQueryKeys.ts";
import { UseQueryOptions } from "@/common/type/query/UseQueryOptions.ts";
import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { buildQueryFn } from "@/common/features/validate-fetch-data";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

/**
 * Configuration parameters for the {@link useFetchPerson} hook.
 */
type FetchParams<TData = unknown> = {
    _id: ObjectId;
    schema: ZodSchema<TData, ZodTypeDef, unknown>;
    config?: Omit<RequestOptions, "limit">;
    options?: UseQueryOptions<TData>;
};

/**
 * Custom hook to retrieve a specific Person entity by its ID.
 */
export function useFetchPerson<TData = unknown>(
    { _id, schema, config, options }: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchPerson = buildQueryFn<TData>({
        action: () => findByID({ _id, config }),
        schema,
    });

    return useQuery({
        queryKey: PersonCRUDQueryKeys._id({ _id, ...config }),
        queryFn: fetchPerson,
        ...useQueryOptionDefaults(options),
    });
}