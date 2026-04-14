/**
 * @fileoverview React Query hook for fetching a single Genre by its slug.
 * Orchestrates slug-based retrieval with standardized error handling and
 * consistent query key management.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import {UseQueryOptions} from "@/common/type/query/UseQueryOptions.ts";
import {GenreCRUDQueryKeys} from "@/domains/genres/_feat/crud-hooks/GenreCRUDQueryKeys.ts";
import {ZodType, ZodTypeDef} from "zod";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {findBySlug} from "@/domains/genres/_feat/crud/GenreCRUDRepository.ts";

/**
 * Parameters for the useFetchGenreBySlug hook.
 */
type FetchParams<TData = unknown> = {
    slug: string;
    schema: ZodType<TData, ZodTypeDef, unknown>;
    config?: Omit<RequestOptions, "limit">;
    options?: UseQueryOptions<TData>;
};

/**
 * Custom hook for retrieving a single genre via the Genre repository using its slug.
 */
export default function useFetchGenreBySlug<TData = unknown>(
    {slug, schema, config, options}: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchGenre = buildQueryFn<TData>({
        schema,
        action: () => findBySlug({slug, config}),
    });

    return useQuery({
        queryKey: GenreCRUDQueryKeys.slug({slug, ...config}),
        queryFn: fetchGenre,
        ...useQueryOptionDefaults<TData>(options),
    });
}