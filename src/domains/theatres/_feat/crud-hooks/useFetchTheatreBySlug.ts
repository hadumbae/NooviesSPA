/**
 * @fileoverview React Query hook for fetching a single theatre by its slug.
 */

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useQueryOptionDefaults from "@/common/utility/query/useQueryOptionDefaults.ts";
import { findBySlug } from "@/domains/theatres/_feat/crud";
import { buildQueryFn } from "@/common/_feat/validate-fetch-data";
import { TheatreCRUDQueryKeys } from "@/domains/theatres/_feat/crud-hooks/queryKeys.ts";
import {SlugQueryConfig} from "@/common/types";

/**
 * Retrieves a specific theatre by its unique URL-safe slug.
 */
export function useFetchTheatreBySlug<TData = unknown>(
    { schema, slug, config, options }: SlugQueryConfig<TData>
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