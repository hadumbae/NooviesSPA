/**
 * @fileoverview React Query hook for fetching a single theatre by its slug.
 */

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { RequestOptions } from "@/common/type/request/RequestOptions.ts";
import { FetchQueryOptions } from "@/common/type/query/FetchQueryOptions.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import { findBySlug } from "@/domains/theatres/_feat/crud";
import { ZodType, ZodTypeDef } from "zod";
import { buildQueryFn } from "@/common/features/validate-fetch-data";
import { TheatreCRUDQueryKeys } from "@/domains/theatres/_feat/crud-hooks/TheatreCRUDQueryKeys.ts";

/** Props for the useFetchTheatreBySlug hook. */
type FetchParams<TData = unknown> = {
    schema: ZodType<TData, ZodTypeDef, unknown>;
    slug: string;
    config?: RequestOptions;
    options?: FetchQueryOptions<unknown>;
};

/**
 * Retrieves a specific theatre by its unique URL-safe slug.
 */
export function useFetchTheatreBySlug<TData = unknown>(
    { schema, slug, config, options }: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchTheatre = buildQueryFn<TData>({
        action: () => findBySlug({ slug, config }),
        schema,
    });

    return useQuery({
        queryKey: TheatreCRUDQueryKeys.slug({ slug, ...config }),
        queryFn: fetchTheatre,
        ...useQueryOptionDefaults(options),
    });
}