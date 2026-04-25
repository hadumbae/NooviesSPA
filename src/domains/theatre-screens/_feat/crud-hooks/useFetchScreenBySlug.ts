/**
 * @fileoverview React Query hook for fetching a single theatre screen by its slug.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import {FetchQueryOptions} from "@/common/type/query/FetchQueryOptions.ts";
import {ZodType, ZodTypeDef} from "zod";
import {findBySlug} from "@/domains/theatre-screens/_feat/crud";
import {buildQueryFn} from "@/common/features/validate-fetch-data";
import {TheatreScreenCRUDQueryKeys} from "@/domains/theatre-screens/_feat/crud-hooks/queryKeys.ts";

/** Parameters for the useFetchScreenBySlug hook. */
type FetchParams<TData = unknown> = {
    schema: ZodType<TData, ZodTypeDef, unknown>;
    slug: string;
    config?: Omit<RequestOptions, "limit">;
    options?: FetchQueryOptions<TData>;
};

/**
 * Fetches and validates a single theatre screen record using its slug.
 */
export function useFetchScreenBySlug<TData = unknown>(
    {schema, slug, config, options}: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchScreen = buildQueryFn<TData>({
        action: () => findBySlug({slug, config}),
        schema,
    });

    return useQuery({
        queryKey: TheatreScreenCRUDQueryKeys.slug({slug, ...config}),
        queryFn: fetchScreen,
        ...useQueryOptionDefaults(options),
    });
}