/**
 * @fileoverview React Query hook for fetching a single Person record by its slug.
 * This hook is primarily used for public-facing profiles or SEO-friendly
 * administrative detail views, ensuring data integrity via Zod validation.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {ZodType, ZodTypeDef} from "zod";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {findBySlug} from "@/domains/persons/_feat/crud";
import {PersonCRUDQueryKeys} from "@/domains/persons/_feat/crud-hooks/PersonCRUDQueryKeys.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";

/**
 * Configuration parameters for the {@link useFetchPersonBySlug} hook.
 */
type FetchParams<TData = unknown> = {
    slug: string;
    schema: ZodType<TData, ZodTypeDef, unknown>;
    config?: RequestOptions;
    options?: FetchQueryOptions<unknown>;
};

/**
 * Custom hook to retrieve a Person entity by its unique slug.
 */
export function useFetchPersonBySlug<TData = unknown>(
    {slug, schema, config, options}: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchPerson = buildQueryFn<TData>({
        schema,
        action: () => findBySlug({slug, config}),
    });

    return useQuery({
        queryKey: PersonCRUDQueryKeys.slug({slug, ...config}),
        queryFn: fetchPerson,
        ...useQueryOptionDefaults(options),
    });
}